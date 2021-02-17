const express = require('express');
const welcomeRouter = require("./welcome/welcome-router")
const postsRouter = require("./posts/posts-router")
const usersRouter = require("./users/users-router")
const logger = require("./middleware/middleware")

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.use(express.json())
server.use(logger("short"))

server.use(welcomeRouter)
server.use(usersRouter)
server.use(postsRouter)

server.use((err, req, res) => {
  console.log(err)

  res.status(500).json({
    message: "Something went wrong"
  })
})



module.exports = server;
