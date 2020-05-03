const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast = require('./utils/forecast')

const app  = express()


//Depine paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partailsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partailsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//to add functionalities
app.get('',(req,res)=>{
    res.render('index',{
        tittle:'Weather',
        name:'Anuj Chaturvedi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        tittle:'About Me',
        name:'Anuj Chaturvedi'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpfull text',
        tittle:'HELP',
        name:'Anuj Chaturvedi'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }   
            
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                place:req.query.address
            })
        })
    })    
 })
 
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        tittle:'404',
        name:'Anuj Chaturvedi',
        errorMessage:'Help article not found'

    })
})
 app.get('*',(req,res)=>{
     res.render('404',{
         tittle:'404',
         name:'Anuj Chaturvedi',
         errorMessage:'Page not found.'
     })
 })
app.listen(3000,()=>{
    console.log('http://localhost:3000')
})  

 