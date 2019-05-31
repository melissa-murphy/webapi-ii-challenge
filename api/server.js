const express = require('express');

const db_router = require('../posts/database-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h1>Hello to the world, from Lambda School Students</h1>`);
}); // Server running initial GET

server.use('/posts', db_router);

module.exports = server;
