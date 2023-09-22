CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    nick VARCHAR(16) NOT NULL UNIQUE,
    email VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(32) NOT NULL,
    description VARCHAR(255),
    birthday TIMESTAMP NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP
);