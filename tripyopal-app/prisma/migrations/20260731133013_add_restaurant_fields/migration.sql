-- AlterTable
ALTER TABLE "Prestador" ADD COLUMN     "highlights" JSONB,
ADD COLUMN     "weeklyHours" JSONB,
ADD COLUMN     "cuisineType" TEXT,
ADD COLUMN     "ambiance" TEXT,
ADD COLUMN     "dietaryOptions" TEXT;
