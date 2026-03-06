import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigrations1772829873245 implements MigrationInterface {
    name = 'InitMigrations1772829873245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assignments" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, "dueDate" TIMESTAMP, "teacherId" integer NOT NULL, "studentId" integer NOT NULL, CONSTRAINT "PK_c54ca359535e0012b04dcbd80ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "teacherId" integer, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_7568c49a630907119e4a665c605" UNIQUE ("email"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD CONSTRAINT "FK_e9a3111140d313859c9dfa8f22d" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assignments" ADD CONSTRAINT "FK_7e7f1ff0b4a2d73aa910e3bd5cd" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_d273fbce9b7860e40111a44870d" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_d273fbce9b7860e40111a44870d"`);
        await queryRunner.query(`ALTER TABLE "assignments" DROP CONSTRAINT "FK_7e7f1ff0b4a2d73aa910e3bd5cd"`);
        await queryRunner.query(`ALTER TABLE "assignments" DROP CONSTRAINT "FK_e9a3111140d313859c9dfa8f22d"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "assignments"`);
    }

}
