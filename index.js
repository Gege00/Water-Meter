function detectOutliers(curReadings, oldReadings) {
  for (let i = 0; i < curReadings.length; i++) {
    // Get all readings where time of day was similar and the house was the same
    oldReadings.sort(function (a, b) {
      return a - b
    });
    let median = 0;

    if (oldReadings.length % 2 != 0) {
      median = oldReadings[Math.ceil(oldReadings.length / 2.0) - 1];
      oldReadings.splice(Math.ceil(oldReadings.length / 2.0) - 1, 1)
    } else {
      median = (oldReadings[oldReadings.length / 2 - 1] + oldReadings[oldReadings.length / 2]) / 2
    }
    //console.log("median: " + median);
    let loweroldReadings = oldReadings.slice(0, oldReadings.length / 2);
    let higheroldReadings = oldReadings.slice(oldReadings.length / 2, oldReadings.length);
    //console.log("loweroldReadings: ");
    //console.log(loweroldReadings);
    //console.log("higheroldReadings: ");
    //console.log(higheroldReadings);


    let lowerMedian = 0;
    if (loweroldReadings.length % 2 != 0) {
      lowerMedian = loweroldReadings[Math.ceil(loweroldReadings.length / 2.0) - 1]
    } else {
      lowerMedian = (loweroldReadings[loweroldReadings.length / 2 - 1] + loweroldReadings[loweroldReadings.length / 2]) / 2
    }
    //console.log("lowerMedian: " + lowerMedian);

    let higherMedian = 0;
    if (higheroldReadings.length % 2 != 0) {
      higherMedian = higheroldReadings[Math.ceil(higheroldReadings.length / 2.0) - 1]
    } else {
      higherMedian = (higheroldReadings[higheroldReadings.length / 2 - 1] + higheroldReadings[higheroldReadings.length / 2]) / 2
    }
    //console.log("higherMedian: " + higherMedian);

    let iqr = higherMedian - lowerMedian;
    if (curReadings[i] - median > iqr * 1.5) {
      // Outlier! Alert house of potential leak
      console.log("Outlier in house " + i)
    }
  }
}

//var reading = [ 40, 200, 300, 1, 7 ];
//let dbReadings = [39, 7, 15, 36, 40, 41];
//detectOutliers(reading, dbReadings);

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
