'use strict';

//application dependencies
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
const DATABASE_URL = 'postgres://localhost:5432/thisday';
// const DATABASE_URL = 'postgres://leoytnwtnffusx:55d229e7c81673dc2d26475f97b337fadf3be5beedacc15474ca42be89922afc@ec2-107-20-249-48.compute-1.amazonaws.com:5432/d1ue3bak1qpoqb'
const NOAA_API_TOKEN = process.env.NOAA_API_TOKEN;
const NYT_API_KEY = process.env.NYT_API_KEY;

//API keys go here
app.use(cors());

//Database setup goes here
const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

//Application Middleware goes here

// url: 'https://api.nytimes.com/svc/archive/v1/2016/1.json?' + NYT_API_KEY,

app.get('/nyt/articles/:year/:month', bodyparser, (request, response) => {
  const url = `https://api.nytimes.com/svc/archive/v1/${request.params.year}/${request.params.month}.json?`;
  superagent(url)
    .set(`api-key`, `${NYT_API_KEY}`)
    .then(articles => response.send(articles))
    .catch(console.error);
});

app.get('/noaa/weather/:year/:month/:day', bodyparser, (request, response) => {
  let dateIncrease = day => {
    let array = day.split('-');
    let months = {
      '01': 31,
      '02': (array[0]%4 === 0) ? 29 : 28,
      '03': 31,
      '04': 30,
      '05': 31,
      '06': 30,
      '07': 31,
      '08': 31,
      '09': 30,
      '10': 31,
      '11': 30,
      '12': 31
    };
    if(parseInt(array[2]) !== months[array[1]]) array[2]++;
    else if(array[1] === '12'){
      array[0]++;
      array[1] = '01';
      array[2] = '01';
    }
    else{
      array[1]++;
      array[2] = '01';
    }
    return array.map(y => y.toString()).map(x => (x.length === 1)? '0'+ x : x).join('-');
  };

  let date = `${request.params.year}-${request.params.month}-${request.params.day}`;
  const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=CITY:US530018&startdate=${date}&enddate=${dateIncrease(date)}&units=standard`;
  superagent(url)
    .set(`token`, `${NOAA_API_TOKEN}`)
    .then(weather => response.send(weather))
    .catch(console.error);
});

app.get('/api/v1/users', (request, response) => {
  client.query(`SELECT * FROM users;`)
    .then(results => response.send(results.rows))
    .catch(console.error);
});

app.get('/test', (request, response) => response.send('Testing App'));

app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));


