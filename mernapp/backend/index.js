const express = require('express')
const cors = require('cors');

const app = express()
const port = 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors());

//This basically links your react frontend and backend.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); //this port number is the one on which react-app is running
  res.header(
    "Access-Control-Allow-Origin-Header",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})
//////////////////

const mongoDB = require("./db")

mongoDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Harshit!')
})

//Login and Signup
app.use('/api', require("./Routes/createUser"))

//Display Data
app.use('/api', require("./Routes/displayData"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})