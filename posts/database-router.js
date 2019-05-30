const Posts = require('../data/db');

const router = require('express').Router();

router.get('./posts', async (req, res) => {
    try {
      const posts = await Posts.find(req.query);
      res.status(200).json(posts);
    } catch (e) {
      console.log(e);
      // log error to database
      res
        .status(500)
        .json({ message: `Internal Server Error: cannot retrieve database` });
    }
  }); // GET all posts
  
  router.get('/posts/:id', async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
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
  
  router.post('/posts', async (req, res) => {
    try {
      const post = await Posts.add(req.body);
      res.status(201).json(post);
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: `Internal Server Error: unable to add post.` });
    }
  }); // POST new post
  
  router.delete('posts/:id', async (req, res) => {
    try {
      const deleteID = await Posts.remove(req.params.id);
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
  
  router.route('/posts/:id', async (req, res) => {
    try {
      const post = await Posts.update(req.params.id, req.body);
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
  }); // Update specfic post
  
  router.listen(4000, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
  });
  
  module.exports = router;
  
  
  