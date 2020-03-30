const request = require('postman-request');

const geocode = (address, callback) => {

  const token = 'pk.eyJ1IjoidGhyaWxsaW5waGlsIiwiYSI6ImNrODYzOTE0djA5eW4zbm1yc2QzeHNmbHIifQ.t7T-L6DHJaXgGQ-nUHdzhQ';
  
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&limit=1`;
  
  request({url: geoUrl, json: true}, (error, response, body) => {
  
    if(error){
         callback('Cant connect!', undefined)
        } // Print the error if one occurred
      
      else {
        if(response.statusCode != 200){
          callback(response.statusCode, undefined)
        }; // Print the response status code if a response was received
    
        if(body.features.length == 0){
          callback('No loc found!', undefined);
        } else {
        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0];
        const place = body.features[0].place_name;
        
        callback(undefined, {
          latitude, 
          longitude, 
          place
        });
      } 
    }
      
    });
  
  }
  
  
  module.exports = geocode