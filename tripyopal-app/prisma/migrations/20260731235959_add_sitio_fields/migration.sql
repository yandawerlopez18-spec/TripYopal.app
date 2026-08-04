-- AlterTable
ALTER TABLE "Prestador" ADD COLUMN     "siteType" TEXT,
ADD COLUMN     "bestTimeToVisit" TEXT,
ADD COLUMN     "averageClimate" TEXT,
ADD COLUMN     "visitRecommendations" TEXT,
ADD COLUMN     "difficultyLevel" TEXT,
ADD COLUMN     "entryFee" TEXT,
ADD COLUMN     "visitTips" JSONB;
