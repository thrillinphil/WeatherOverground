const request = require('postman-request');


const forecast = (lat, lon, callback) => {

  const appKey = '7f7ad2b459da1cb4b87a42c84d47947a';
  const url = `https://api.darksky.net/forecast/7f7ad2b459da1cb4b87a42c84d47947a/${lat},${lon}`;

  request({url, json: true}, (error, response, {currently}) => {
    if(error){
      callback('Cant connect!', undefined)
     } // Print the error if one occurred
   
   else {
     if(response.statusCode != 200){
       callback(response.statusCode, undefined)
     }; // Print the response status code if a response was received
 
     if(response.statusCode == 200){
       callback(undefined, currently);
      }
    }
})}


module.exports = forecast