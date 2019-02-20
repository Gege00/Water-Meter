var ttn = require('ttn');
var settings = require('../config/config.json')

var db=require('../database/db');

// ttn.data(settings.tnn.tempID, settings.tnn.tempKey)
//   .then(function(client) {
//
//     client.on("uplink", function(devID, payload) {
//
//       let bufData = payload.payload_raw;
//       let bufJSON = bufData.toJSON();
//
//
//       let msg =  {values:bufJSON.data};
//
//
//       var data=Object.assign({time: payload.metadata.time},msg);
//       var query={
//         collection : "tempatureTest",
//         data: data
//       }
//
//
//       db.insertDocument(query, function(result){
//
//       })
//     })
//   })
//   .catch(function(error) {
//     console.error("Error", error)
//     })
//

ttn.data(settings.tnn.appID, settings.tnn.accessKey)
  .then(function(client) {
    client.on("uplink", function(devID, payload) {


      var query={
        collection : "water_data",
        data: {
          time: payload.metadata.time,
          values: payload.payload_raw.toJSON().data}
      }


      db.insertDocument(query, function(result){

      })


    })
  })
  .catch(function(error) {
    console.error("Error", error)
  })
