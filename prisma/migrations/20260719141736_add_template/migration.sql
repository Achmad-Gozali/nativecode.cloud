-- CreateTable
CREATE TABLE "template" (
    "id" TEXT NOT NULL,
    "namaTemplate" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "gambarUrl" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "linkDemo" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "template_pkey" PRIMARY KEY ("id")
);
