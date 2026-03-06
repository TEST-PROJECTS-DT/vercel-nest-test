import { createApp } from './app.bootstrap';
import type { IncomingMessage, ServerResponse } from 'http';

let cachedApp: Awaited<ReturnType<typeof createApp>> | null = null;

async function getApp() {
  if (cachedApp) return cachedApp;
  cachedApp = await createApp();
  return cachedApp;
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const app = await getApp();
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp(req, res);
}
