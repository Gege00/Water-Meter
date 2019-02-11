var ttn = require("ttn");
var http = require("http");

var appID = "watermeter-test01"
var accessKey ="ttn-account-v2.S6_w-wpG19AvLeUNjorYMhx4uctru7dmed_fcTwyvlQ"


ttn.data(appID, accessKey)
  .then(function (client) {
    console.log("it's in the then");
    setInterval(function() {
        // http.get("http://lokalist-backend.herokuapp.com/public/heartbeat");
        //console.log("hey");
    }, 300); // every 5 minutes (300000)
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload);
      console.log(payload.payload_raw);
      let bufData = payload.payload_raw;
      console.log(bufData.toString('utf8'));

    })
  })
  .catch(function (error) {
    console.error("Error", error)
    process.exit(1)
  })
