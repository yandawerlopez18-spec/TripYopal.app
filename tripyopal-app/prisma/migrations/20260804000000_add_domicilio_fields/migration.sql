-- AlterTable
ALTER TABLE "Prestador" ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "menuCategories" JSONB,
ADD COLUMN     "allies" JSONB,
ADD COLUMN     "deliveryTime" TEXT,
ADD COLUMN     "minOrder" TEXT,
ADD COLUMN     "deliveryFee" TEXT,
ADD COLUMN     "orderTracking" TEXT;
