const express = require('express')
const app = express()
const connectDB = require('./config/db')
const dotenv  = require('dotenv')
const session = require("express-session");
const MongoStore = require("connect-mongo");


dotenv.config({path:'./config/.env'})

// parse incoming json request
app.use(express.json())

connectDB()

// session middleware
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
  );

  app.use('/', require('./routes/'))
  app.use('/api', require('./routes/api'))

const PORT = process.env.PORT || 9000



app.listen(PORT, ()=>console.log(`server is running on port ${PORT}`))