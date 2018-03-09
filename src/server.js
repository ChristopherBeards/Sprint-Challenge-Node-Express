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
  request('https://api.coindesk.com/v1/bpi/currentprice/USD.json', (error, response, body) => {
  });

  request('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday', (error, response, body) => {
    res.send(body);
  });
});


server.listen(3030, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`)
  }
});