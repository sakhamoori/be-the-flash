const express = require("express");
const BPromise = require('bluebird');
const fs = require('fs')
const app = express();
const request = require("request-promise");
const { spawn } = require('child_process');

app.get("/api/fetchresults", async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  if(req.query.location){
    //return res.send("GOOD REQUEST")
  }else{
    return res.send({"status":"fail"});
  }

  let dropoff_latitude = "";
  let dropoff_longitude = "";
  let dropoff_address = req.query.location;

  const make_api_call = async(id) => {
    return new BPromise((resolve) => {
      let py = spawn('python3', ['crawler.py', id]),
      dataString = '';

      py.stdout.on('data', function(data){
        dataString += data;
      });
      
      py.stdout.on('end', function(){
        return resolve(eval(dataString));
      });
      py.stdin.write(JSON.stringify(dataString));
      py.stdin.end();
    });
  }

  const DRIVING = '&mode=balanced;car;traffic:enabled&departure=now';
  const BICYCLE = '&mode=balanced;bicycle;traffic:enabled&departure=now';
  const TRANSIT = '&mode=balanced;publicTransport;traffic:enabled&departure=now';
  const PEDESTRIAN = '&mode=balanced;pedestrian;traffic:enabled&departure=now';
  const HOV = '&mode=balanced;carHOV;traffic:enabled&departure=now';

  const trainingTimeDistance = async(data) => {
    const { response: { route }} = data;
    const { summary: { travelTime, distance } } = route[0];
    const dist = parseFloat((distance/1000) * 0.621371).toFixed(4);

    const hours = Math.floor(travelTime/3600);
    const minutes = Math.floor((travelTime-hours * 3600) / 60);
    const seconds = Math.floor((travelTime%60));
    let timeString = hours > 0 ? `${hours} hrs` : '';
    timeString = minutes > 0 ? `${timeString} ${minutes} min`: timeString;
    timeString = !timeString && seconds > 0 ? '< 1 min': timeString;

    return {
      hours,
      minutes,
      seconds,
      timeString,
      dist
    };
  }

  const getDistanceUrl = (pickup_latitude, pickup_longitude, mode) => {
    const url = 'https://route.api.here.com/routing/7.2/calculateroute.json?app_id=QsrMlDJpePXekVyk0b9K&app_code=irWUOsu0W7IC43pEhdavNg&waypoint0=geo!';
    const wayPoint = '&waypoint1=geo!';
    return `${url}${dropoff_latitude},${dropoff_longitude}${wayPoint}${pickup_latitude},${pickup_longitude}${mode}`;
  }

  const get_distance_in_driving = async(pickup_latitude, pickup_longitude) => {
    const url = getDistanceUrl(pickup_latitude, pickup_longitude, DRIVING);
    return request({
      url,
      method: "GET",
      json: true
    }).then(function(json) {
      return trainingTimeDistance(json);
    });
  }

  const get_distance_in_biking = async(pickup_latitude, pickup_longitude) => {
    const url = getDistanceUrl(pickup_latitude, pickup_longitude, BICYCLE);
    return request({
      url,
      method: "GET",
      json: true
    }).then(function(json) {
      return trainingTimeDistance(json);
    });
  }

  const get_distance_in_transit = async(pickup_latitude, pickup_longitude) => {
    const url = getDistanceUrl(pickup_latitude, pickup_longitude, TRANSIT);

    return request({
      url,
      method: "GET",
      json: true
    }).then(function(json) {
      return trainingTimeDistance(json);
    });
  }

  const get_distance_in_walking = async(pickup_latitude, pickup_longitude) => {
    const url = getDistanceUrl(pickup_latitude, pickup_longitude, PEDESTRIAN);

    return request({
      url,
      method: "GET",
      json: true
    }).then(function(json) {
      return trainingTimeDistance(json);
    });
  }

  const get_distance_in_hov = async(pickup_latitude, pickup_longitude) => {
    const url = getDistanceUrl(pickup_latitude, pickup_longitude, HOV);

    return request({
      url,
      method: "GET",
      json: true
    }).then(function(json) {
      return trainingTimeDistance(json);
    });
  }

  const postmates = async(pickup_address) => {
    try {
      const response = await request({
        url:
          "https://api.postmates.com/v1/customers/cus_MMtVXjaOw-ayd-/delivery_quotes",
        method: "POST",
        auth: {
          user: "12392232-e3f3-4a23-8128-839fc9925857"
        },
        json: true,
        form: {
          dropoff_address: dropoff_address,
          pickup_address: pickup_address
        }
      })
      const { fee, duration, currency_type } = response
      return { fee, duration, currency_type };
    } catch (err) {
      return null;
    }
  }

  const geocoderpart = `https://geocoder.api.here.com/6.2/geocode.json?app_id=QsrMlDJpePXekVyk0b9K&app_code=irWUOsu0W7IC43pEhdavNg&searchtext=${req.query.location}`;

  console.log('Hello', req.query.location);

  const geocode = await request({
    method: "GET",
    uri: geocoderpart,
    json: true,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Mobile Safari/537.36"
    }
  });

  const { Response: { View } } = geocode;
  const { Result } = View[0];
  const { Location: { DisplayPosition: { Latitude, Longitude} }} = Result[0];
  dropoff_latitude = Latitude;
  dropoff_longitude = Longitude

  let locationPart = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=${req.query.type? req.query.type : `grocery_or_supermarket`}`;
  locationPart = `${locationPart}&location=${Latitude},${Longitude}&radius=${req.query.radius ? req.query.radius : 16000}`;
  locationPart = `${locationPart}&key=AIzaSyD6JCMB88SJ1InPCIrrw81WsFZpzpa8n78&keyword=${req.query.keyword ? req.query.keyword : ""}`;

  let json = await request({
    method: "GET",
    uri: locationPart,
    json: true,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Mobile Safari/537.36"
    }
  });

  let resultSet = json.results.map(obj => {
    let newObject = {};
    newObject.opening_hours = obj.opening_hours;
    newObject.types = obj.types;
    newObject.namelocation = obj.name + " " + obj.vicinity;
    newObject.storename = obj.name;
    newObject.address = obj.vicinity;
    newObject.lat = obj.geometry.location.lat;
    newObject.lng = obj.geometry.location.lng;
    newObject.place_id = obj.place_id;
    return newObject;
  });

  for (let i = 0; i < resultSet.length; i++) {
    const { lat, lng, namelocation } =  resultSet[i];
    await new BPromise.all([
      make_api_call(namelocation),
      get_distance_in_driving(lat, lng),
      get_distance_in_biking(lat, lng),
      get_distance_in_transit(lat, lng),
      get_distance_in_walking(lat, lng),
      get_distance_in_hov(lat, lng),
      postmates(namelocation),
    ]).then((response) => {
      resultSet[i].updated_todays_schedule_expanded_cleaned = response[0];

      // Driving
      const driving = response[1];
      resultSet[i].driving = {...driving};
      
      // Biking
      const biking = response[2];
      resultSet[i].biking = {...biking};
      
      // Transit
      const transit = response[3];
      resultSet[i].transit = {...transit};
      
      // Walking
      const walking = response[4];
      resultSet[i].walking = {...walking};
      
      // HOV
      const hov = response[5];
      resultSet[i].hov = {...hov};

      resultSet[i].driving_distance = resultSet[i].driving.dist;

      // Postmates
      const postmates = response[6];
      resultSet[i].postmates = {...postmates};
    });
  }

  resultSet.sort((a,b) => {
    parseFloat(a.driving_distance) - parseFloat(b.driving_distance);
  });
  resultSet.splice(0,2);
  return res.json(resultSet);
});

app.listen("8081");
console.log("Magic happens on port 8081");
exports = module.exports = app;
