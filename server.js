'use strict'

//apploication dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyparser = require('body-parser').urlencoded({extend: true});
const superagent = require('superagent');

//application setup
const app = express();
const PORT = process.env.port;
const CLIENT_URL = process.env.CLIENT_URL;
const TOKEN = process.env.TOKEN;

//API keys go here


//Database setup goes here

//Application Middleware goes here




