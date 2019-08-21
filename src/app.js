const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const weather = require('./weather.js');
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
const partialsPath = path.join(__dirname, "../views/partials")

hbs.registerPartials(partialsPath)
app.get('', (req, res) => {
    res.render('weather', {
        title: 'Weather app index',
        name: 'Andrew Mead'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({error: 'you must provide an address'});
    }
   weather.forecast(req.query.address, (error, data) => 
   { if(error) { return res.send({error:error}); } 
   res.send({name:data.place_name, temperature: data.currently.temperature})} )
});

app.get('*', (req, res) => {
    res.send("404");
})

app.listen(port, () => {console.log('Server is up on ' + port)})