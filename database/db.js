var mongo=require('mongodb').MongoClient;
var settings=require('../settings.json');

var db;


module.exports= {
  connectToSrv: function (cb){
    mongo.connect(settings.db.adress,{ 'useNewUrlParser': true },function(err,client){
        db=client;
        console.log(err);
        console.log(client)
        return cb(err);
      });

  },
  getDB: function(){
    return db;
  }

};
