const request = require("request");

function getBusBoardArrivals(res) {
  const postcode = "NW5 1TL";

  getLongAndLatForPostcode(postcode);

  const longAndLatPromise = promise;

  longAndLatPromise
    .then(function (raduisUrl) {
      return new Promise(function (resolve, reject) {
        request(raduisUrl, function (error, response, body) {
          const returnedRadiusBody = JSON.parse(body);

          const nearestTwoBusStopsIds = returnedRadiusBody.stopPoints.slice(
            0,
            2
          );
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
      const seperateBusList = twoListsOfBusArrivals.slice(0, 2);
      const firstList = seperateBusList[0].slice(0, 5);
      const secondList = seperateBusList[1].slice(0, 5);
      const busBoardLists = {
        first: firstList,
        second: secondList,
      };

      res.send(busBoardLists);
    });
}

function getLongAndLatForPostcode(postcode) {
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
  return promise;
}
module.exports = getBusBoardArrivals;
