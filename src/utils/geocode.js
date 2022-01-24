const request = require("request");
const geocode = (address, callback) => {
  let address1 = encodeURIComponent(address);
  const url2 =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address1 +
    ".json?limit=2&access_token=pk.eyJ1IjoiY2hpcmFnYmhheWFuYSIsImEiOiJja3kxaHpmbHIwYmlrMndtcngyZXBmOHYzIn0.2w4HWeybBQsfMnWr7VXvIA";
  request({ url: url2, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the match", undefined);
    } else {
      callback("", {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
      });
    }
  });
};
module.exports = geocode;
