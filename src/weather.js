const request = require('request');

const url = 'https://api.darksky.net/forecast/349f1efc6173c1644383108bf7500d2b/';

let loc;
const geocode = (address, callback) => {
    mapurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoianJ3YWduZXIiLCJhIjoiY2p6Zm9yMHJkMGRkODNubGtldnAyejRzaSJ9.ulWL2kEx7tF_IShbBO4Iow';
    
    request({url: mapurl, json:true}, (error,response) => {

        if(error) {
            console.log("SHIT");
            callback(error,null);
        }
        else if(response.body.features.length===0)
        {
            callback(address + "didn't work", null);
        }
        else {
            const data = response.body;
            callback(null, data);
        }
    });
    

};

const forecast = (location, callback) => {
    geocode(location, (error,data) => {
    
       // console.log(e);
       if(error ) { return callback(error);}
       loc = data.features[0].center[1] + "," + data.features[0].center[0];
       let reqURL = url+loc+'?units=si';
        request({url: reqURL, json:true}, (error,response) => {
            if(error) {
                console.log("SHIT");
            }
            else if(response.body.error || data.features.length < 1)
            {
                console.log(reqURL + "didn't work");
            }
            else {
               
                const forecast = response.body;
                forecast.place_name = data.features[0].place_name;
                callback(null,forecast);
            }
        })
    })};


//forecast('sweet+grass+montana', (error,forecast)=>{console.log(forecast.hourly.data[5])});

module.exports.forecast = forecast;