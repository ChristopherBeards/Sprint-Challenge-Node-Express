const fetch = require('node-fetch');

const getCurrent = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const getPrevious = () => {
  return new Promise((resolve, reject) => {
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

module.exports = {
  getCurrent,
  getPrevious
};