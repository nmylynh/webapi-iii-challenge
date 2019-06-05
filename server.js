const express = require('express');
const server = express();
const configMiddleware = require('./middleware.js');
const postRoute = require('./posts/postRouter');
const userRoute = require('./users/userRouter');

configMiddleware(server);

server.use('./posts/postRouter.js', postRoute);
server.use('./users/userRouter.js', userRoute);

server.get('/', (req, res) => {
  res.send(`<h2>Up and running!</h2>`)
});


module.exports = server;
