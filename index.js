// require your server and launch it
const express = require('express');

const postsRouter = require("./api/posts/posts-router")
const usersRouter = require("./api/users/users-router")
const {logger} = require("./api/middleware/middleware")

const server = express();

// remember express by default cannot parse JSON in request bodies

// global middlewares and routes need to be connected here

server.use(express.json())
server.use(logger("short"))


server.use("/users", usersRouter)
server.use("/posts", postsRouter)
server.get('/', (req, res) => {
  res.send(`<h2>Unit 4 Project 3</h2>`);
});
server.use((err, req, res) => {
  console.log(err)

  res.status(500).json({
    message: "Something went wrong"
  })
})

const port = process.env.PORT || 4000

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`)
})