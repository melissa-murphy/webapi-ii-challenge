const express = require('express');

const db_router = require('./posts/database-router.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h1>Hello to the world, from Lambda School Students</h1>`);
}); // Server running initial GET

server.get('./posts', async (req, res) => {
  try {
    const posts = await db_router.find(req.query);
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    // log error to database
    res
      .status(500)
      .json({ message: `Internal Server Error: cannot retrieve database` });
  }
}); // GET all posts

server.get('/posts/:id', async (req, res) => {
  try {
    const post = await db_router.findById(req.params.id);
    if (post) {
      res.status(200).json.post;
    } else {
      res.status(404).json({ message: `Post not found, please try again.` });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: `Internal Server Error: Post not found.` });
  }
}); // GET individual post

server.post('/posts', async (req, res) => {
  try {
    const post = await db_router.add(req.body);
    res.status(201).json(post);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: `Internal Server Error: unable to add post.` });
  }
}); // POST new post

server.delete('posts/:id', async (req, res) => {
  try {
    const deleteID = await db_router.remove(req.params.id);
    if (deleteID > 0) {
      res.status(200).json({ message: `Delete post successful` });
    } else {
      res.status(404).json({ message: `Post not found` });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: `Internal Server Error: cannot find post` });
  }
}); // Delete post

server.route('/posts/:id', async (req, res) => {
  try {
    const post = await db_router.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: `Post not found, please try again` });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: `Internal Server Error: cannot update post` });
  }
});

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});

module.exports = server;


