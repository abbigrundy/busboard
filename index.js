const request = require("request");
const readlineSync = require("readline-sync");

console.log("Bus Stop Code?");
const busStopCode = readlineSync.prompt();

const url = "https://api.tfl.gov.uk/StopPoint/" + busStopCode + "/Arrivals";
request(url, function (error, response, body) {
  const returnedBody = JSON.parse(body);

  displayFirstFive(returnedBody);
});

function displayFirstFive(returnedBody) {
  const firstFive = returnedBody.slice(0, 5);
  console.log(firstFive);
}
