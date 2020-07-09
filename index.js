const request = require("request");

const postcode = "NW5 1TL";

let promise = new Promise(function (resolve, reject) {
  request("https://api.postcodes.io/postcodes/" + postcode, function (
    error,
    response,
    body
  ) {
    const returnedPostcodeBody = JSON.parse(body);

    const longitudeOfPostcode = returnedPostcodeBody.result.longitude;
    const latitudeOfPostcode = returnedPostcodeBody.result.latitude;

    const raduisUrl =
      "https://api.tfl.gov.uk/StopPoint?stopTypes=NaptanPublicBusCoachTram&lat=" +
      latitudeOfPostcode +
      "&lon=" +
      longitudeOfPostcode;

    resolve(raduisUrl);
  });
});

promise
  .then(function (raduisUrl) {
    return new Promise(function (resolve, reject) {
      request(raduisUrl, function (error, response, body) {
        const returnedRadiusBody = JSON.parse(body);

        const nearestTwoBusStopsIds = returnedRadiusBody.stopPoints.slice(0, 2);
        const arrayUrls = [];
        for (let i = 0; i < 2; i++) {
          let individualBusStopIds = nearestTwoBusStopsIds[i].naptanId;

          const url =
            "https://api.tfl.gov.uk/StopPoint/" +
            individualBusStopIds +
            "/Arrivals";

          arrayUrls.push(url);
        }
        resolve(arrayUrls);
      });
    });
  })
  .then(function (arrayUrls) {
    const arrayPromises = [];

    for (let i = 0; i < arrayUrls.length; i++) {
      arrayPromises.push(
        new Promise(function (resolve, reject) {
          request(arrayUrls[i], function (error, response, body) {
            const returnedBody = JSON.parse(body);
            resolve(returnedBody);
          });
        })
      );
    }

    return Promise.all(arrayPromises);
  })
  .then(function (twoListsOfBusArrivals) {
    console.log(`The bus stop number ${200}`);
    displayFirstFiveArrivalsOnList(twoListsOfBusArrivals[0]);
    console.log(`The bus stop number ${100}`);
    displayFirstFiveArrivalsOnList(twoListsOfBusArrivals[1]);
  });

function displayFirstFiveArrivalsOnList(listOfArrivals) {
  const firstFiveToArrive = listOfArrivals.slice(0, 5);

  firstFiveToArrive.forEach(function (busArrival) {
    console.log(`${busArrival.lineName} ${busArrival.expectedArrival}`);
  });
}
