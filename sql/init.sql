CREATE DATABASE IF NOT EXISTS 1d100_pro;

USE 1d100_pro;

ALTER TABLE 1d100_pro AUTO_INCREMENT = 1;


CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    genre VARCHAR(50) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS rpg (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    genre_id JSON,
    images VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname TEXT NOT NULL,
    mail VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS rpg_genres (
    rpg_id INTEGER NOT NULL,
    genre_id INTEGER NOT NULL,
    PRIMARY KEY (rpg_id, genre_id),
    FOREIGN KEY (rpg_id) REFERENCES rpg(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS rpg_tables (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    nb_players INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    rpg_id INTEGER NOT NULL,
    author INTEGER NOT NULL,
    session_date DATE NOT NULL,
    FOREIGN KEY (rpg_id) REFERENCES rpg(id) ON DELETE CASCADE,
    FOREIGN KEY (author) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_registrations (
    user_id INTEGER NOT NULL,
    rpg_table_id INTEGER NOT NULL,
    registration_date DATE NOT NULL,
    PRIMARY KEY (user_id, rpg_table_id, registration_date),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (rpg_table_id) REFERENCES rpg_tables(id) ON DELETE CASCADE
);
