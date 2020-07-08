const request = require("request");
const readlineSync = require("readline-sync");

console.log("What postcode are you at?");
const postcode = "NW5 1TL";

request("https://api.postcodes.io/postcodes/" + postcode, function (
  error,
  response,
  body
) {
  const returnedPostcodeBody = JSON.parse(body);

  const longitudeOfPostcode = returnedPostcodeBody.result.longitude;
  const latitudeOfPostcode = returnedPostcodeBody.result.latitude;

  const tflUrl =
    "https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=" +
    latitudeOfPostcode +
    "&lon=" +
    longitudeOfPostcode;

  request(tflUrl, function (error, response, body) {
    const returnedtflBody = JSON.parse(body);

    const nearestTwoBusStops = returnedtflBody.stopPoints.slice(0, 2);

    for (let i = 0; i < 2; i++) {
      let individualBusStopIds = nearestTwoBusStops[i].naptanId;
    }
    const url =
      "https://api.tfl.gov.uk/StopPoint/" + individualBusStopIds + "/Arrivals";

    request(url, function (error, response, body) {
      const returnedBody = JSON.parse(body);

      displayFirstFive(returnedBody);
    });

    console.log(individualBusStopIds);
  });

  function displayFirstFive(returnedBody) {
    const firstFive = returnedBody.slice(0, 5);
    console.log(firstFive);
  }
});
