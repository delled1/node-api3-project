const express = require('express');
const welcomeRouter = require("./welcome/welcome-router")
const postsRouter = require("./posts/posts-router")
const usersRouter = require("./users/users-router")

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.use(express.json())
server.use(welcomeRouter)
server.use(postsRouter)
server.use(usersRouter)



module.exports = server;
