var express = require('express');
var router = express.Router();
var db = require('../db/config');

const DB_NAME = 'directors';

console.log(':: DIRECTORS ::');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'DIRECTORS'
    });
});

router.route('/server/api/directors')
    .get(function (req, res) {
        console.log(':: DIRECTORS :: get directors');
        var directors = db(DB_NAME);
        res.send(directors);
    })
    .post(function (req, res) {
        console.log(':: DIRECTORS :: insert director');
        db(DB_NAME).insert(req.body).then(function (director) {
            res.send(director);
        }, function (err) {
            res.status(500).send({ error: err });
        });
    });

/* GET director from id. */
router.route('/server/api/directors/:id')
    .get(function (req, res) {
        console.log(':: DIRECTORS :: get director / id : ' + req.params.id);
        var director = db(DB_NAME).getById(req.params.id);
        res.send(director);
    })
    .put(function (req, res) {
        console.log(':: DIRECTORS :: update director / id : ' + req.params.id);
        var id = req.params.id;
        db(DB_NAME).updateById(id, req.body);
        res.send();
    })
    .delete(function (req, res) {
        console.log(':: DIRECTORS :: delete director / id : ' + req.params.id);
        var director = db(DB_NAME).removeById(req.params.id);
        res.send(director);
    });

module.exports = router;