const request = require("request");
const readlineSync = require("readline-sync");

console.log("Bus Stop Code?");
const busStopCode = readlineSync.prompt();
const url = "https://api.tfl.gov.uk/StopPoint/" + busStopCode + "/Arrivals";
request(url, function (error, response, body) {
  const returnedBody = JSON.parse(body);

  function firstFive(returnedBody) {
    const fiveBack = returnedBody.slice(0, 5);
    console.log(fiveBack);
  }
  firstFive(returnedBody);
});
