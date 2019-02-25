var express = require('express');
var router = express.Router();
var db=require('../database/db.js')

router.get('/', function(req, res, next) {

    var q={
      collection: "water_data",
      query: {},
      projection: {
        "time":1,
        "values": 1,
        "_id": 0
      }
    }
    db.read(q, function(result){

          res.jsonp(result)
    })


});

module.exports = router;
