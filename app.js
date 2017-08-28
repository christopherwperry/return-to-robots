const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    restaurants.find({}).toArray(function (err, docs) {
      res.render("index", {restaurants: docs})
    })
  })
})
