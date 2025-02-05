-- CreateEnum
CREATE TYPE "DoughTypes" AS ENUM ('Pan', 'ThinAndCrispy', 'StuffedCrust', 'BeefAndCheddarStuffed', 'CheesyBites');

-- CreateTable
CREATE TABLE "Dough" (
    "id" TEXT NOT NULL,
    "name" "DoughTypes" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Dough_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dough" ADD CONSTRAINT "Dough_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
