const express = require('express');
const { logger } = require('./middleware/middleware')
const usersRouter = require('./users/users-router')
const postsRouter = require('./posts/posts-router')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
// global middlewares and routes need to be connected here
server.use(logger)
server.use('/users/', usersRouter)
server.use('/posts', postsRouter)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use((err, req, res) => {
  console.log(err)
  res.status(500).json({
    message: "Something went wrong, please try again later"
  })
})

module.exports = server;