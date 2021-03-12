-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "experienceAmount" INTEGER DEFAULT 0,
    "level" INTEGER DEFAULT 1,
    "challengesCompleted" INTEGER DEFAULT 0
);
INSERT INTO "new_User" ("id", "createdAt", "name", "email", "experienceAmount", "level", "challengesCompleted") SELECT "id", "createdAt", "name", "email", "experienceAmount", "level", "challengesCompleted" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
