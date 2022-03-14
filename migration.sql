DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS workout;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    id serial PRIMARY KEY,
    name text,
    username text
);

CREATE TABLE workout(
    id serial PRIMARY KEY,
    userid integer,
    type text,
    time integer,
    date text
);

CREATE TABLE exercise(
    id serial primary key,
    workoutid integer,
    weight integer,
    sets integer,
    reps integer,
    time integer,
    distance integer
);

CREATE TABLE goals(
    id serial PRIMARY KEY,
    userid integer,
    goal text,
    duration integer
);

INSERT INTO users(name,username) VALUES('Samuel', 'sammyj');