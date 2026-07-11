/*
  Warnings:

  - Added the required column `contentHi` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleHi` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "titleTe" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "excerptTe" TEXT,
    "excerptHi" TEXT,
    "content" TEXT NOT NULL,
    "contentTe" TEXT NOT NULL,
    "contentHi" TEXT NOT NULL,
    "mediaType" TEXT NOT NULL DEFAULT 'IMAGE',
    "mediaUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "author" TEXT NOT NULL DEFAULT 'Why.Karimnagar Desk',
    "categoryId" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Article" ("author", "categoryId", "content", "contentTe", "createdAt", "excerpt", "excerptTe", "featured", "id", "mediaType", "mediaUrl", "published", "publishedAt", "slug", "title", "titleTe", "updatedAt") SELECT "author", "categoryId", "content", "contentTe", "createdAt", "excerpt", "excerptTe", "featured", "id", "mediaType", "mediaUrl", "published", "publishedAt", "slug", "title", "titleTe", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
