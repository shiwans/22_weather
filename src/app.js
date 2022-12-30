const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Can use html file or JSON file in res.send

// console.log(__filename)
// console.log(__dirname)
// console.log(path.join(__dirname, '../public/'))
const app= express()

//Defines path for Express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Shiwans vaishya'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About us',
        name:'Shiwans vaishya'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is the text to know more about website or to help users..',
        title:'Help',
        name:'shiwans vaishya'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please write address: '
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if( error){
                return escape.send({error})
            }
            res.send({
                forecast :forecastData,
                location,
                address :req.query.address,
            })
        })
    })
    // res.send({
    //     forecast:'It is snowing',
    //     location:'mumbai',
    //     address:req.query.address
    // })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term' 
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'shiwans vaishya',
        title:'404',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        name:'shiwans vaishya',
        title:'404',
        errorMessage:'Page not found'
    })
})

app.listen(3005, () => { 
    console.log('server is up to work')
})

