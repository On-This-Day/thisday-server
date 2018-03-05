'use strict';

//apploication dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyparser = require('body-parser').urlencoded({extend: true});
const superagent = require('superagent');

//application setup
const app = express();
const PORT = process.env.port || 3000;
const CLIENT_URL = process.env.CLIENT_URL;
// const TOKEN = process.env.TOKEN;
const DATABASE_URL = 'postgres://localhost:5432/thisday';
// const DATABASE_URL = remote

//API keys go here
app.use(cors());

//Database setup goes here
const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//Application Middleware goes here

app.get('/', (request, response) => response.send('Testing App'));

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));


