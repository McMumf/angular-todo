var express = require('express');
var cors = require('cors');
var router = express.Router();

var sequelize = require('sequelize');
var models = require('../models');
const Op = sequelize.Op;

var corsOptions = {
    origin: '*',
    methods: ['OPTIONS','GET','PUT','POST','DELETE'],
    allowedHeaders: ['Origin', 'Content-Type', 'X-Requested-With', 'Content-Length', 'Accept'],
    preflightContinue: true,
    credentials: true
};

router.get('/users',function(req, res, next) {
    models.User.findAll({
      order: [
        [ 'first_name', 'ASC' ]
      ],
      include : [
        { model: models.Task, limit: 3 }
      ]
    }).then(function(users) {
        res.send(users);
    });
});

router.get('/users/:id', function(req, res, next) {
    models.User.find({
        where: {
            id: req.params.id
        }
    }).then(function(user) {
        res.send(user);
    });
});

router.get('/users/:id/tasks', function(req, res, next) {
    models.Task.findAll({
        where: {
            UserId: req.params.id
        }
    }).then(function(tasks) {
        res.send(tasks);
    });
});

router.post('/adduser', function(req, res, next) {
    var firstName = req.body.first_name,
        lastName = req.body.last_name,
        email = req.body.email;
    models.User.create({
        first_name: firstName,
        last_name: lastName,
        email: email
    }).then(function() {
        res.send(200);
    })
});

router.post('/createtask', function(req, res, next) {
    var userId = req.body.userId,
        task = req.body.task;
    models.Task.create({
        UserId: userId,
        task: task,
        completed: false
    }).then(function() {
        res.send(200);
    });
})

module.exports = router;
