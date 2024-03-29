const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

// mongodb password: <YOUR-PASSWORD>
// connection string:
//        mongodb+srv://mawan:<YOUR-PASSWORD>@cluster0-rnnrq.mongodb.net/node-angular?retryWrites=true&w=majority

const app = express();

mongoose.connect("mongodb+srv://mawan:<YOUR-PASSWORD>@cluster0-rnnrq.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed')
  });


app.use(bodyParser.json());

app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
