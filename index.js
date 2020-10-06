const express = require('express');

const app = express();

require('dotenv').config();

var bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));


// parse application/json
app.use(bodyParser.json());

const {
    Client
} = require('pg');

const client = new Client({
    "host": "localhost",
    "port": 5432,
    "user": "postgres",
    "password": "desai",
    "database": "booklist"

});

app.post('/add', async (req, res) => {

    await client.connect()
        .then(() => {
            console.log('DATABASE CONNECTED');

        })
        .catch((err) => {
            console.log(err);
        });

    const sql = 'INSERT INTO BOOKS (title, authors) VALUES ($1,$2)';
    const params = [req.body.title, req.body.author];

    client.query(sql, params, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(res);
    });
    const result = await client.query("select * from books");
    console.log(result.rows);
    res.send(result.rows);

});

app.post('/delete', async (req, res)=>{

    await client.connect()
        .then(() => {
            console.log('DATABASE CONNECTED');

        })
        .catch((err) => {
            console.log(err);
        });

        const sql = 'DELETE FROM BOOKS WHERE book_id = $1';
        const params = [req.body.id];
    
        client.query(sql, params,(err, resp) => {
            if (err) {
                res.send(err);
            }
            res.send(resp);
        });
});

app.patch('/update', async(req, res)=>{

    await client.connect()
        .then(() => {
            console.log('DATABASE CONNECTED');
        })
        .catch((err) => {
            console.log(err);
        });

        const sql = 'UPDATE BOOKS SET title=$1, authors=$2 WHERE book_id=$3';
        const params = [req.body.title,req.body.authors,req.body.id];

        client.query(sql, params,(err, resp) => {
            if (err) {
                res.send(err);
            }
            res.send(resp);
        });
});


app.listen(process.env.PORT, () => {
    console.log(`server run at ${process.env.PORT}`);
});