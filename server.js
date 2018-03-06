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
// const CLIENT_URL =
// const TOKEN = process.env.TOKEN;
// const DATABASE_URL = 'postgres://localhost:5432/thisday';
// const DATABASE_URL = 'postgres://leoytnwtnffusx:55d229e7c81673dc2d26475f97b337fadf3be5beedacc15474ca42be89922afc@ec2-107-20-249-48.compute-1.amazonaws.com:5432/d1ue3bak1qpoqb'
const NYT_API_KEY = '0748f599cbe342e19d3f708d4603a492';

//API keys go here
app.use(cors());

//Database setup goes here
// const client = new pg.Client(DATABASE_URL);
// client.connect();
// client.on('error', err => console.error(err));

//Application Middleware goes here

// url: 'https://api.nytimes.com/svc/archive/v1/2016/1.json?' + NYT_API_KEY,
app.get('/nyt/articles', bodyparser, (request, response) => {
  const url = `https://api.nytimes.com/svc/archive/v1/1961/10.json?`;
  superagent(url)
    .set(`api-key`, `${NYT_API_KEY}`)
    .then(articles => response.send((articles)));
  // .then(console.log(response));
  // .catch(console.error);
});

app.get('/', (request, response) => response.send('Testing App'));

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));




