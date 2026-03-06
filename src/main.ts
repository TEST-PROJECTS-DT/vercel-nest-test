import { createApp } from './app.bootstrap';

async function bootstrap() {
  const app = await createApp();
  await app.listen(8080);
}
void bootstrap();
