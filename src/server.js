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
  let current = 0;
  let previous = 0;

  request('https://api.coindesk.com/v1/bpi/currentprice/USD.json', (error, response, body) => {
    let parseObject = JSON.parse(body);
    current = parseObject.bpi.USD.rate_float;
  });

  request('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday', (error, response, body) => {
    let parseObject = JSON.parse(body);
    previous = Object.values(parseObject.bpi); 
    previous = previous[0];
    let difference = current - previous;


    res.send({current, previous, difference});
  });
});

server.get('*', (req, res) => {
  res.status(STATUS_USER_ERROR);
  res.send("Page not found");
});


server.listen(3030, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`)
  }
});