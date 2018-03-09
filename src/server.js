const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors'); //middleware
const request = require('request'); //middleware
const server = express();
const fetch = require('node-fetch');


server.use(bodyParser.json());
server.use(cors());

let PORT = 3030;

const STATUS_USER_ERROR = 422;


async function comparePrices(current){
    const response = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
    let previous = await response.json();
    previous = Object.values(previous.bpi)[0];
    current = current.bpi.USD.rate_float;
    let difference = current - previous;
    return { difference };
}

server.get('/compare', (req, res) => {
  fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
  .then(res => res.json())
  .then((current) => { 
    const promise = comparePrices(current);
    promise.then(difference => res.send(difference));
  })
});

// server.get('/compare', (req, res) => {
//   let current = 0;
//   let previous = 0;

//   request('https://api.coindesk.com/v1/bpi/currentprice/USD.json', (error, response, body) => {
//     let parseObject = JSON.parse(body);
//     current = parseObject.bpi.USD.rate_float;
//   });

  // request('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday', (error, response, body) => {
  //   let parseObject = JSON.parse(body);
  //   previous = Object.values(parseObject.bpi); 
  //   previous = previous[0];
  //   let difference = current - previous;


  //   res.send({current, previous, difference});
  // });
// });

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