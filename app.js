const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mustache = require('mustache-express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

app.use(express.static(__dirname + '/public'));
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use('/employed', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({job: {$nin: [null]}}).toArray(function (err, users) {
      res.render("index", {robots: users})
    })
  })
})

app.use('/forhire', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({job: null}).toArray(function (err, users) {
      res.render("index", {robots: users})
    })
  })
})


app.use('/skill/:skill', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    skill = req.params.skill;
    const robots = db.collection('robots');
    robots.find({skills: {$in: [skill]}}).toArray(function (err, users) {
      res.render("index", {robots: users, skill})
    })
  })
})

app.use('/country/:country', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    country = req.params.country;
    const robots = db.collection('robots');
    robots.find({"address.country": country}).toArray(function (err, users) {
      res.render("index", {robots: users, country})
    })
  })
})

app.use('/:user', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    user = req.params.user;
    const robots = db.collection('robots');
    robots.find({username: user}).toArray(function (err, users) {
      res.render("id", {robots: users})
    })
  })
})

app.use('/', function (req, res) {
  MongoClient.connect(mongoURL, function (err, db) {
    const robots = db.collection('robots');
    robots.find({}).toArray(function (err, users) {
      res.render("index", {robots: users})
    })
  })
})

app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
  console.log("The server is running on port 3000")
});
