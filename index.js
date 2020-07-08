const request = require("request");
var readlineSync = require("readline-sync");

console.log("Bus St" + "p Code?");
const BusStopCode = readlineSync.prompt();
const url = "https://api.tfl.gov.uk/StopPoint/" + BusStopCode + "/Arrivals";
request(url, function (error, response, body) {
  //   console.error('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', coresponse && response.statusCode); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the HTML for the Google homepage.
  const returnedBody = JSON.parse(body);
  // console.log(returnedBody);
  function firstFive(returnedBody) {
    const fiveback = returnedBody.slice(0, 5);

    console.log(fiveback);
  }
  firstFive(returnedBody);
});

// and then print it out the next 5 buses at that stop.

// //
// 1.Break the URL into sections (base url and then the different queries)
// 2. Then we can add the stopID into the variable - hardcoded at the moment to be 490008660N

// //
