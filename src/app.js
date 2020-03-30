const path = require('path');

const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geo.js');
const forecast = require('./utils/forecast.js');


const app = express();

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(path.join(__dirname, '../pub')));

app.get('', (req,res) => {
  res.render('index')
})

// app.get('/about', (req,res) => {
//   res.render('about',{
//     title: '<h1>Welcome to my dang ol page</h1>'
//   })
// })

app.get('/weather', (req,res) => {

  
if(!req.query.address){
  res.send({
    error: 'I need an address, dummy.'
  });
} else {
  
  geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {

    if(error){
      
     return res.send({ error })

    } else {
  
      forecast(latitude, longitude, (error, { summary, temperature, precipProbability } = {}) => {
  
        if(error){

          return res.send({ error })

        } else {
  
        res.send({
          summary: summary,
          place: place,
          temperature: temperature,
          precipProbability: precipProbability
        })
        }
      })
    }
    
  
  })

  }
})

app.get('*', (req,res) => {
  res.render('404',{
    title: '<h1>Welcome to my dang ol page</h1>'
  })
})

// app.com

// app.com/help

// app.com/about

app.listen(3000, () => {

  console.log('Shit\'s goin down');

});