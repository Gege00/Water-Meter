var ttn=require('ttn');
var settings=require('../settings.json')
var fs = require('fs');

ttn.data(settings.tnn.tempID,settings.tnn.tempKey)
  .then(function (client) {

    client.on("uplink", function (devID, payload) {

      let bufData = payload.payload_raw;
      let bufJSON = bufData.toJSON();
      let msg = { payload : bufJSON.data}
      // console.log(bufData.toJSON());
      // console.log(msgAll);
      var msg0 = msg.payload[0];
      var msg1 = msg.payload[1];
      var msg2 = msg.payload[2];
      var msg3 = msg.payload[3];
      let data = [ msg0, msg1, msg2, msg3];

/*      // READ FROM FILE
        fs.readFile('../temp.txt', 'utf-8' ,function(err, buf) {
        let fileTxt = buf.toString();

        let message = `${fileTxt}
        ${data} ${payload.metadata.time}`;

        fs.writeFile('../temp.txt', message, function(err, data){
          if (err) console.log(err);
          console.log("Successfully Written Temp to File.");
        });
      }); */


    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })


ttn.data(settings.tnn.appID,settings.tnn.accessKey)
  .then(function (client) {

    client.on("uplink", function (devID, payload) {

      // console.log(payload);
      // console.log(payload.payload_raw);
      let bufData = payload.payload_raw;
      let bufJSON = bufData.toJSON();

      let msg = { payload : bufJSON.data}
      // console.log(bufData.toJSON());
      // console.log(msgAll);
      var msg0 = msg.payload[0];
      var msg1 = msg.payload[1];
      var msg2 = msg.payload[2];
      var msg3 = msg.payload[3];
      console.log("Data from the water: ");
      console.log([ msg0, msg1, msg2, msg3]);

      // READ FROM FILE

    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })
