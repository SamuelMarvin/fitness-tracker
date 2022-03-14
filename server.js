require("dotenv").config();
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

app.get('/users', ((req, res) =>{
    pool.query("SELECT * FROM users")
    .then((result)=> res.send(result.rows))
    .catch((err)=> console.log(err))
}))

const port = process.env.PORT;
app.listen(port);