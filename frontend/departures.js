fetch("http://localhost:3000/departureBoards?postcode=nw51tl")
  .then((response) => {
    return response.json();
  })
  .then((busStopArrivals) => {
    console.log(busStopArrivals);
  });
