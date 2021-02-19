// require your server and launch it
const server = require("./api/server")
require('dotenv').config()
const port = process.env.PORT || 8080

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})