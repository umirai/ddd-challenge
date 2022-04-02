-- AlterTable
CREATE SEQUENCE "task_status_id_seq";
ALTER TABLE "task_status" ALTER COLUMN "id" SET DEFAULT nextval('task_status_id_seq');
ALTER SEQUENCE "task_status_id_seq" OWNED BY "task_status"."id";
