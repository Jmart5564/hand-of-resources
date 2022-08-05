-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS bands;
DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS beer;
DROP TABLE IF EXISTS avatar_characters;

CREATE TABLE bands (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    genre VARCHAR,
    country VARCHAR,
    band_members INT
);

INSERT INTO bands (name, genre, country, band_members) VALUES
('Lotus', 'Jam Band', 'USA', 5),
('Gojira', 'Progressive Metal', 'France', 4),
('King Buffalo', 'Psychedelic Rock', 'USA', 3),
('King Gizzard and the Lizard Wizard', 'Acid Rock', 'Australia', 6),
('All Them Witches', 'Stoner Rock', 'USA', 3);

CREATE TABLE cats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    color VARCHAR,
    age INT,
    owner VARCHAR
);

INSERT INTO cats (name, color, age, owner) VALUES
('Momo', 'Black', 2, 'Colter'),
('Ghoul', 'Black', 10, 'Jessica'),
('Stu', 'White, Grey', 2, 'Colter'),
('Ralph', 'Black, Grey, White', 1, 'Adam'),
('Eddna', 'Grey', 2, 'Adam'),
('Harry', 'Black, White', 6, 'Carolyn'),
('Dino', 'Grey, Black', 1, 'Charlie');

CREATE TABLE pokemon (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    pokedex_number INT,
    type VARCHAR
);

INSERT INTO pokemon (name, pokedex_number, type) VALUES 
('Kadabra', 64, 'Psychic'),
('Haunter', 93, 'Ghost, Poison'),
('Cubone', 104, 'Ground'),
('Jolteon', 135, 'Electric'),
('Dragonair', 148, 'Dragon'),
('Ninetales', 38, 'Fire');

CREATE TABLE beer (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    brewery VARCHAR,
    type VARCHAR,
    ABV VARCHAR
);

INSERT INTO beer (name, brewery, type, ABV) VALUES
('The Goat', 'Holy Mountain', 'Saison', '4.9%'),
('Kosmos', 'Põhjala', 'IPA', '5.5%'),
('Sour Rose', 'Crooked Stave', 'Sour', '4.5%'),
('Montucky Cold Snack', 'Montucky Cold Snacks', 'Lager', '4.1%'),
('Lets Play!', 'Level Beer', 'Pilsner', '5%'),
('Atma', 'TRVE', 'Belgian Strong Golden Ale', '8.2%');

CREATE TABLE avatar_characters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    affiliation VARCHAR,
    is_bender BOOLEAN,
    age INT
);

INSERT INTO avatar_characters (name, affiliation, is_bender, age) VALUES 
('Toph', 'Earth Kingdom', TRUE, 12),
('Zuko', 'Fire Nation', TRUE, 16),
('Sokka', 'Water Tribe', FALSE, 15),
('Katara', 'Water Tribe', TRUE, 14),
('Suki', 'Earth Nation', FALSE, 15);