require('dotenv').config();
const express = require('express');
const pg = require('pg');
const app = express();
app.use(express.json());
const { Pool } = require('pg');

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(express.static('public'));

app.get('/users', (req, res) =>{
    pool.query("SELECT * FROM users")
    .then((result)=> res.send(result.rows))
    .catch((err)=> console.log(err))
});

app.get('/:id/workout', (req, res) =>{
    const id = req.params.id;
    pool.query('SELECT * FROM workout WHERE id=$1', [id])
    .then((result)=> res.send(result.rows))
    .catch((err)=> console.log(err))
});

app.get('/:id/exercise', (req,res) =>{
    const id = req.params.id;
    pool.query('SELECT * FROM exercise WHERE id=$1', [id])
    .then((result)=> res.send(result.rows))
    .catch((err)=> console.log(err))
})

app.get('/:id/goals', (req,res) =>{
    const id = req.params.id;
    pool.query('SELECT * FROM goals WHERE id=$1', [id])
    .then((result)=> res.send(result.rows))
    .catch((err)=> console.log(err))
})

app.post('/users', (req, res) => {
    const {name, username} = req.body;
    pool.query('INSERT INTO users(name, username) VALUES($1, $2) RETURNING *;',[name, username])
    .then((result)=> res.send(result.rows[0]))
    .catch((err)=> res.sendStatus(500))
})

app.post('/workout', (req, res) => {
    const {userid, type, time, date} = req.body;
    pool.query('INSERT INTO workout(userid, type, time, date) VALUES($1, $2, $3, $4) RETURNING *;',[userid, type, time, date])
    .then((result)=> res.send(result.rows[0]))
    .catch((err)=> res.sendStatus(500))
})

app.post('/exercise', (req, res) => {
    const {workoutid, weight, sets, reps, time, distance} = req.body;
    pool.query('INSERT INTO exercise(workoutid, weight, sets, reps, time, distance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;',[workoutid, weight, sets, reps, time, distance])
    .then((result)=> res.send(result.rows[0]))
    .catch((err)=> res.sendStatus(500))
})

app.post('/goals', (req, res) => {
    const {userid, goal, durartion} = req.body;
    pool.query('INSERT INTO goals(userid, goal, durartion) VALUES($1, $2) RETURNING *;',[userid, goal, durartion])
    .then((result)=> res.send(result.rows[0]))
    .catch((err)=> res.sendStatus(500))
})
//delete user and all data with him
app.delete('/users/:id/:workoutid', (req,res)=>{
    const id = req.params.id;
    const workoutid = req.params.workoutid;
    pool.query('DELETE FROM goals WHERE userid=$1;',[userid])
    pool.query('DELETE FROM exercise WHERE workoutid=$1;',[workoutid])
    pool.query('DELETE FROM workout WHERE userid=$1;',[userid])
    pool.query('DELETE FROM users WHERE id=$1;',[userid])
    .then((result)=> res.send('deleted'))
    .catch((err)=> res.status(500))
});
//delete workout
app.delete('/workout/:workoutid', (req,res)=>{
    const workoutid = req.params.workoutid;
    pool.query('DELETE FROM workout WHERE workoutid=$1;',[workoutid])
    .then((result)=> res.send('deleted'))
    .catch((err)=> res.status(500))
});
//delete exercise
app.delete('/exercise/:workoutid', (req,res)=>{
    const workoutid = req.params.workoutid;
    pool.query('DELETE FROM exercise WHERE workoutid=$1;',[workoutid])
    .then((result)=> res.send('deleted'))
    .catch((err)=> res.status(500))
});
//delete goals
app.delete('/goals/:id/', (req,res)=>{
    const id = req.params.id;
    const workoutid = req.params.workoutid;
    pool.query('DELETE FROM goals WHERE userid=$1;',[userid])
    pool.query('DELETE FROM exercise WHERE workoutid=$1;',[workoutid])
    pool.query('DELETE FROM workout WHERE userid=$1;',[userid])
    pool.query('DELETE FROM users WHERE id=$1;',[userid])
    .then((result)=> res.send('deleted'))
    .catch((err)=> res.status(500))
});

const port = process.env.PORT;
app.listen(port);