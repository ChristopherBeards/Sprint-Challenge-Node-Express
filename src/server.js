//==================================================
//          MVC VERSION - IMPLEMENTATION
//==================================================
const express = require('express');
const server = express();
const controllers = require('./controllers/controllers.js');
let PORT = 3030;


server.use(controllers);

server.listen(3030, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`)
  }
});