const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=160eb2e85e5a8b0a97a169eed497ddd8&units=metric'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the network',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,"The temperature of "+location+" is "+body.main.temp +"°C ")
        }
    })
}

module.exports=forecast