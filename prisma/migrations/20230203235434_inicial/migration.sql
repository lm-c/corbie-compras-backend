/*
  Warnings:

  - Made the column `name` on table `families` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `families` MODIFY `name` VARCHAR(250) NOT NULL;
