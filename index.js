//Main starting point of application
// Run with 'node index.js'
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// DB Setup
// We connect mongoose to MongoDB and creates a new database inside of mongo
mongoose.connect('mongodb://localhost:auth/auth');

//App Setup

// app.use register things as middleware that any request is passed into
// morgan is a logging framework
app.use(morgan('combined'));
// bodyparser is used to parse incoming request, here into json
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server Setup
const port = process.env.PORT || 3090;

// Creates an HTTP server that recieves requests and anything that comes in,
// forward it to the app
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on: ${port}`);
