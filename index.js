require('dotenv').config()
require("./database/client")
const express = require('express')
const app = express()
const port = process.env.PORT || 8002
const films = require('./routers/filmsRouter');
const users = require('./routers/usersRouter');
const bodyParser = require('body-parser')


app.use(bodyParser.json())


app.get("/", (req, res) => {
  res.send('GET is fired')
});

app.use('/api/films', films)
app.use('/api/users', users)
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})