const express = require('express');
const users = require("./users-model")
const router = express.Router();
const { validateUserId, validateUser } = require ("../middleware/middleware")

router.get('/users', (req, res, next) => {

  users.get()
  .then((users) => {
    res.status(200).json(users)
  })
  .catch((err) => {
    next(err)
  })
});

router.get('/users/:id', validateUserId(), (req, res) => {

  res.json(req.user)
});

router.post('/users', validateUser(), (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid

	users.insert(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch(next)
});

// router.put('/:id', (req, res) => {
//   // RETURN THE FRESHLY UPDATED USER OBJECT
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });

// router.delete('/:id', (req, res) => {
//   // RETURN THE FRESHLY DELETED USER OBJECT
//   // this needs a middleware to verify user id
// });

// router.get('/:id/posts', (req, res) => {
//   // RETURN THE ARRAY OF USER POSTS
//   // this needs a middleware to verify user id
// });

// router.post('/:id/posts', (req, res) => {
//   // RETURN THE NEWLY CREATED USER POST
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });

// do not forget to export the router
module.exports = router;