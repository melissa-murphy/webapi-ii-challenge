const express = require('express');

const post_router = require('../posts/post-router');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h1>Hello to the world, from Lambda School Students</h1>`);
}); // Server running initial GET

server.use('/api/posts', post_router);

module.exports = server;
