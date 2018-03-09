const express = require('express');
const router = express.Router();

const { getCurrent, getPrevious } = require('../models/models.js');

const STATUS_USER_ERROR = 422;

let current = 0;
let previous = 0;

router.get('/compare', (req, res)=>{
  getCurrent()
  .then(data => {
    current = data.bpi.USD.rate_float;
  })

  getPrevious()
  .then(data => {
    previous = Object.values(data.bpi)[0];
    let difference = current - previous;
    res.send({ difference })
  })
  .catch(err => console.log("Dude, we need to talk...", err));
});



router.get('*', (req, res) => {
  res.status(STATUS_USER_ERROR);
  res.send("Page not found");
});

module.exports = router;