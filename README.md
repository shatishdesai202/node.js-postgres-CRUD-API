# node.js-postgres-CRUD-API

Learn how to create a Simple Crud Application by Connecting PostgreSQL with NodeJs, While you are using PostgreSQL as database and NodeJs as backend, you need PostgreSQL database packages to connect with nodejs. There are various packages available but most popular and well documented is node-postgres pg. Let’s start.
# What's needed
<li> Make sure you have postgresql installed on machine and pgAdmin - postgresql management tool </li>
<li> Make sure you have node.js installed </li>

# Database Connections - PostgreSQL
    
    const { Client } = require('pg');


    const client = new Client({
        "host": "localhost",
        "port": 5432,
        "user": "postgres",
        "password": "--YOUR PASSWORD",
        "database": "booklist"

    });

        await client.connect()
        .then(() => {
            console.log('DATABASE CONNECTED');

        })
        .catch((err) => {
            console.log(err);
        });
