var ttn = require("ttn");
var http = require("http");
var fs = require('fs');

var appID = "watermeter-test01"
var accessKey ="ttn-account-v2.S6_w-wpG19AvLeUNjorYMhx4uctru7dmed_fcTwyvlQ"

let tempId = "pitlab-ds18b20";
let tempKey = "ttn-account-v2.D7-uy5QHbEvbjOv65hV_DI4chfWPAC0tWTGNQoiGYno"


ttn.data(tempId, tempKey)
  .then(function (client) {
    console.log("it's in the temp then");  
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      let bufData = payload.payload_raw;
      let bufJSON = bufData.toJSON();
      let msg = { payload : bufJSON.data}
      // console.log(bufData.toJSON());
      // console.log(msgAll);
      var msg0 = msg.payload[0];
      var msg1 = msg.payload[1];
      var msg2 = msg.payload[2];
      var msg3 = msg.payload[3];
      console.log("Data from the heating: ");
      console.log([ msg0, msg1, msg2, msg3]);

      let data = [ msg0, msg1, msg2, msg3];

      // READ FROM FILE
      fs.readFile('temp.txt', 'utf-8' ,function(err, buf) {
        let fileTxt = buf.toString();

        let message = `${fileTxt}
${data} ${payload.metadata.time}`;

        fs.writeFile('temp.txt', message, function(err, data){
          if (err) console.log(err);
          console.log("Successfully Written Temp to File.");
        });
      });
    

    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })


ttn.data(appID, accessKey)
  .then(function (client) {
    console.log("it's in the then");
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
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
      fs.readFile('water.txt', 'utf-8' ,function(err, buf) {
        let fileTxt = buf.toString();

        let message = `${fileTxt}
${data} ${payload.metadata.time}`;

        fs.writeFile('water.txt', message, function(err, data){
          if (err) console.log(err);
          console.log("Successfully Written to Water File.");
        });
      });
    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })
