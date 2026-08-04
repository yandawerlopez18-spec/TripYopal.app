-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "businessType" TEXT,
    "scope" JSONB,
    "birthDate" TEXT,
    "gender" TEXT,
    "country" TEXT,
    "department" TEXT,
    "city" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prestador" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "instagram" TEXT,
    "schedule" TEXT,
    "priceRange" TEXT,
    "imageUrl" TEXT,
    "items" JSONB,
    "gallery" JSONB,
    "stars" DOUBLE PRECISION,
    "status" TEXT,
    "badges" JSONB,
    "neighborhood" TEXT,
    "coordinates" TEXT,
    "checkIn" TEXT,
    "checkOut" TEXT,
    "responseTime" TEXT,
    "languages" TEXT,
    "paymentMethods" TEXT,
    "website" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "amenities" JSONB,
    "security" JSONB,
    "policies" JSONB,
    "blockedDates" JSONB,
    "faq" JSONB,
    "promotions" JSONB,
    "nearbyPlaces" JSONB,
    "media" JSONB,
    "reviews" JSONB,
    "videoUrl" TEXT,
    "tourUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prestador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "location" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "time" TEXT,
    "modality" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SafetyPoint" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,

    CONSTRAINT "SafetyPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tip" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Tip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClimateTip" (
    "id" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ClimateTip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "offer" JSONB NOT NULL,
    "cta" JSONB NOT NULL,
    "contact" JSONB NOT NULL,

    CONSTRAINT "SiteContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
