DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    id serial UNIQUE,
    username text PRIMARY KEY,
    password varchar NOT NULL,
    name text NOT NULL
);

CREATE TABLE goals(
    id serial,
    username text REFERENCES users,
    goal text,
    completionDate text
);

CREATE TABLE workouts(
    id serial PRIMARY KEY, 
    username text REFERENCES users,
    type text,
    time text,
    date text
);

CREATE TABLE exercise(
    id serial,
    name text,
    workoutid integer REFERENCES workouts,
    weight integer,
    sets integer,
    reps integer,
    distance integer
);

INSERT INTO users(username, password, name) VALUES('sammyj', 'password', 'Samuel Marvin');
INSERT INTO goals(username, goal, completionDate) VALUES('sammyj', 'lose 10 lbs', 'april 23, 2022');
INSERT INTO workouts(username, type, time, date) VALUES('sammyj', 'wieghts', '1 hour', 'March 16, 2022');
INSERT INTO exercise(name, workoutid, weight, sets, reps) VALUES('bench', 1, 200, 4, 6);