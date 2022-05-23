const axios = require("axios");
const HttpError = require("../../module/http-error");
const API_KEY = "AIzaSyA5D3jebeYgNts5DMLj6SgZd5GXEX4yG6A";

async function getCoordinatesfromAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    throw new HttpError("couldn't find loaction for specified address!", 422);
  }
  // console.log(data);
  const coordinates = data.results[0].geometry.location;
  return coordinates;
}

module.exports =  getCoordinatesfromAddress;