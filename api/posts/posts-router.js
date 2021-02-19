const express = require('express');
const posts = require("../posts/posts-model")
const router = express.Router();



router.get('/', (req, res,next) => {
  posts.get()
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((err) => {
    next(err)
  })
});

router.get('/:id', (req, res, next) => {
  
	posts.getById(req.params.id)
  .then((post) => {
    res.status(200).json(post)
  })
  .catch(next)
});

// do not forget to export the router
module.exports = router
