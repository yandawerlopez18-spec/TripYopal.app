-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "category" TEXT,
ADD COLUMN     "longDescription" TEXT,
ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "organizer" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "featured" BOOLEAN,
ADD COLUMN     "interestedCount" INTEGER,
ADD COLUMN     "features" JSONB,
ADD COLUMN     "agenda" JSONB,
ADD COLUMN     "allies" JSONB,
ADD COLUMN     "whyAttend" JSONB;
