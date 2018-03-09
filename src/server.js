const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors'); //middleware
const request = require('request'); //middleware
const server = express();

server.use(bodyParser.json());
server.use(cors());

let PORT = 3030;

const STATUS_USER_ERROR = 422;

server.get('/compare', (req, res) => {
  res.send("Testing...");
});


server.listen(3030, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`)
  }
});