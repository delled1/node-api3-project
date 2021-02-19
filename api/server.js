const express = require('express');

const postsRouter = require("./posts/posts-router")
const usersRouter = require("./users/users-router")
const {logger} = require("./middleware/middleware")

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.use(express.json())
server.use(logger("short"))


server.use(usersRouter)
server.use(postsRouter)
server.get('/', (req, res) => {
  res.send(`<h2>Unit 4 Project 3</h2>`);
});
server.use((err, req, res) => {
  console.log(err)

  res.status(500).json({
    message: "Something went wrong"
  })
})



module.exports = server;
