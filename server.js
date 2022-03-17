require('dotenv').config();
const express = require('express');
const pg = require('pg');
const app = express();
const { Pool } = require('pg');

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.node_env === 'production' ? {
        rejectUnauthorized: false
    }: false
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/login/:username', (req,res) =>{
    const username = req.params.username;
    const password = req.body.password;
    pool.query(`SELECT * FROM users WHERE username=$1`,[username])
    .then((result)=> {
        if(result.rows[0].password == password){
            res.send('permission granted')
        } else {res.send('access denied')}
    }).catch((err)=> console.log(err))
})

app.get('/:username/goals', (req,res)=>{
    const username = req.params.username;
    pool.query('SELECT * FROM goals WHERE username=$1',[username])
    .then((result)=> res.send(result.rows))
    .catch((err)=> res.send(err))
})

app.get('/:username/workouts', (req,res)=>{
    const username = req.params.username;
    pool.query('SELECT * FROM workouts WHERE username=$1',[username])
    .then((result)=> res.send(result.rows))
    .catch((err)=> res.send(err))
})

app.get('/:username/:workoutid/exercise', (req,res)=>{
    const username = req.params.username;
    const workoutid = req.params.workoutid;
    pool.query('SELECT * FROM exercise WHERE workoutid=$1',[workoutid])
    .then((result)=> res.send(result.rows))
    .catch((err)=> res.send(err))
})

app.post('/createUser', (req, res) => {
    const {name, username, password} = req.body;
    pool.query('INSERT INTO users(name, username, password) VALUES($1, $2, $3);',[name, username, password])
    .then((result)=> res.send('user created'))
    .catch((err)=> res.send('unable to create user'))
})

app.post('/createWorkout', (req, res) => {
    const {username, type, time, date} = req.body;
    pool.query('INSERT INTO workout(username, type, time, date) VALUES($1, $2, $3, $4) RETURNING *;',[username, type, time, date])
    .then((result)=> res.send('workout created'))
    .catch((err)=> res.send('unable to create workout'))
})

app.post('/createExercise', (req, res) => {
    const {workoutid, weight, sets, reps, time, distance} = req.body;
    pool.query('INSERT INTO exercise(workoutid, weight, sets, reps, time, distance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;',[workoutid, weight, sets, reps, time, distance])
    .then((result)=> res.send('exercise created'))
    .catch((err)=> res.send('unable to create exercise'))
})

app.post('/addGoals', (req, res) => {
    const {username, goal, completionDate} = req.body;
    pool.query('INSERT INTO goals(username, goal, completionDate) VALUES($1, $2) RETURNING *;',[username, goal, completionDate])
    .then((result)=> res.send(result.rows[0]))
    .catch((err)=> res.sendStatus(500))
})

//delete user and all data with him
app.delete('/deleteUser/:username/', (req,res)=>{
    const username = req.params.username;
    pool.query('DELETE FROM goals WHERE userid=$1;',[username])
    pool.query('DELETE FROM exercise WHERE workoutid=$1;',[workoutid])
    pool.query('DELETE FROM workout WHERE userid=$1;',[username])
    pool.query('DELETE FROM users WHERE id=$1;',[username])
    .then((result)=> res.send('deleted'))
    .catch((err)=> res.status(500))
});

//delete workout
app.delete('/deleteWorkout/:workoutid', (req,res)=>{
    const workoutid = req.params.workoutid;
    pool.query('DELETE FROM workout WHERE workoutid=$1;',[workoutid])
    .then((result)=> res.send('deleted'))
    .catch((err)=> res.status(500))
});

//delete exercise
app.delete('/deleteExercise/:workoutid', (req,res)=>{
    const workoutid = req.params.workoutid;
    pool.query('DELETE FROM exercise WHERE workoutid=$1;',[workoutid])
    .then((result)=> res.send('deleted'))
    .catch((err)=> res.status(500))
});

//delete goal
app.delete('/deleteGoal/:username/', (req,res)=>{
    const username = req.params.workoutid;
    pool.query('DELETE FROM goals WHERE username=$1;',[username])
    .then((result)=> res.send('deleted'))
    .catch((err)=> res.status(500))
});

const port = process.env.PORT;
app.listen(port);