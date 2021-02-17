const users = require("../users/users-model")

function logger(format) {
  return (req, res, next) => {
    const time = new Date().toISOString()

    if (format === "short"){
      console.log(`${time} ${req.method} ${req.url}`)
    }
    if (format === "long"){
      console.log(`${time} ${req.ip}`)
    }
    next()
  }
}

function validateUserId() {
  return (req, res, next) => {
    users.getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(404).json({
          message: "User not Found"
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "Error retrieving user"
      })
    })
  }
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body.name){
      return res.status(400).json({
        message: "Missing user data"
      })
    }
    next()
  }
}

function validatePost() {
  return (req, res, next) => {
    if (!req.body.text){
      return res.status(400).json({
        message: "missing required text field"
      })
    }
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}