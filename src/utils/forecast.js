const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const latitude1 = encodeURIComponent(latitude);
  const longitude1 = encodeURIComponent(longitude);
  const url =
    "http://api.weatherstack.com/current?access_key=f3718d603499fcbd28b4cdfac0eae0cf&query=" +
    longitude1 +
    "," +
    latitude1 +
    "&units=m";

  request({ url: url, json: true }, (error, { body }) => {
    // (error,response) {body } is destructed
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.error) {
      callback("Unable to find the match", undefined);
    } else {
      callback("", {
        temp: body.current.temperature,
        feelslike: body.current.feelslike,
        visibility: body.current.visibility,
      });
    }
  });
};

module.exports = forecast;
