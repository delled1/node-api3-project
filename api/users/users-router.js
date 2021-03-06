const express = require('express');
const users = require("./users-model")
const router = express.Router();
const { validateUserId, validateUser } = require ("../middleware/middleware")

router.get('/', (req, res, next) => {

  users.get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((err) => {
    next(err)
  })

});

router.get('/:id', validateUserId(), (req, res) => {

  res.json(req.user)

});

router.post('/', validateUser(), (req, res, next) => {

	users.insert(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch(next)

});

router.put('/:id', validateUser(), validateUserId(), (req, res, next) => {
  users.update(req.params.id, req.body)
  .then((user) => {
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({
        message: "The user could not be found"
      })
    }
  })
  .catch(next)

});

router.delete('/:id', validateUserId(), (req, res, next) => {

  users.remove(req.params.id)
  .then((count) => {
    if (count > 0){
      res.status(200).json({
        message: "User removed"
      })
    } else{
      res.status(404).json({
        message: "User could not be found"
      })
    }
  })
  .catch(next)

});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  users.getUserPosts(req.params.id)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch(next)
});

router.post('/:id/posts', validateUserId(), (req, res, next) => {
  if (!req.body.text) {
    return res.status(400).json({
      message: "Need a value for text"
    })
  }

  users.addUserPost(req.params.id, req.body)
  .then((post) => {
    res.status(201).json(post)
  })
  .catch(next)
});

module.exports = router;