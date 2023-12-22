-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Issue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "extra" TEXT,
    "level" TEXT NOT NULL DEFAULT 'error',
    "projectId" TEXT NOT NULL,
    CONSTRAINT "Issue_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Issue" ("createdAt", "extra", "id", "level", "message", "projectId") SELECT "createdAt", "extra", "id", "level", "message", "projectId" FROM "Issue";
DROP TABLE "Issue";
ALTER TABLE "new_Issue" RENAME TO "Issue";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
