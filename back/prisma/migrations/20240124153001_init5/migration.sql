/*
  Warnings:

  - A unique constraint covering the columns `[staffId,clientId,startDate]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Appointment_staffId_clientId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_staffId_clientId_startDate_key" ON "Appointment"("staffId", "clientId", "startDate");
