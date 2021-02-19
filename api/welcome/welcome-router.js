const express = require("express")

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        message: "Unit 4 Project 3 API"
    });
  });

  module.exports = router