fetch("http://localhost:3000/departureBoards?postcode=nw51tl")
  .then((response) => {
    return response.json();
  })
  .then((busStopArrivals) => {
    console.log(busStopArrivals);
    const firstBusStopArray = extractKeyProperties(busStopArrivals.first);
    const secondBusStopArray = extractKeyProperties(busStopArrivals.second);
    document.querySelector("#results").innerHTML = `${firstBusStopArray.join(
      "<br/>"
    )}<br/><br/> ${secondBusStopArray.join("<br/>")}`;
  });
function extractKeyProperties(busStopArrivals) {
  return busStopArrivals.map(function (busStop) {
    return `${busStop.destinationName}
        ${busStop.expectedArrival}
        ${busStop.lineName}`;
  });
}
