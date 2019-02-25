var mongo=require('mongodb').MongoClient;
var settings=require('../config/config.json');


var db;


module.exports= {
  connectToSrv: function (cb){
    mongo.connect(settings.db.adress,{ 'useNewUrlParser': true },function(err,client){
        db=client.db("watermeter");
        return cb(err);
      });
  },
  getDB: function(){
    return db;
  },

  insertDocument: function(query,cb){

        db.collection(query.collection).insertOne(query.data,function(err,result){

          if(err) return cb(err);
          return cb(result);
        })

  },

  read: function(q,cb){

      db.collection(q.collection).find(q.query).project(q.projection).toArray(function(err,result){
        if(err) return cb(err);
        return cb(result);
      });

  }


};
