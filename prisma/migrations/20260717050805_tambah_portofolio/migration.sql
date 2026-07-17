-- CreateTable
CREATE TABLE "portofolio" (
    "id" TEXT NOT NULL,
    "namaProyek" TEXT NOT NULL,
    "gambarUrl" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "linkWebsite" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portofolio_pkey" PRIMARY KEY ("id")
);
