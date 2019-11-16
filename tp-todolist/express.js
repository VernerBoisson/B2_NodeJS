const methodOverride = require('method-override')
const express = require('express')
const cookieParser = require('cookie-parser')
const utils = require('./functions/utils')
const sessions = require('./functions/sessions')
const app = express()


app.set('views', './views') 
app.set('view engine', 'pug')
app.use(express.static('assets/css'))
app.use(methodOverride('_method'))
app.use(cookieParser())

utils.createDatabase()


app.use(express.urlencoded({extended: false}))
app.use(express.json())


// ROUTES
app.use('/sessions', require('./routes/sessions'))
app.use('/signup', require('./routes/signup'))

app.use((request, response, next) => {
    sessions.getSessionByToken(request.cookies.AccessToken)
    .then((values)=>{
        if(values)
            next()
        else
            response.redirect('/sessions')
    }).catch((error)=>{
        response.status(500).send(error)
    })
})

app.use('/users', require('./routes/users'))

app.use('/todos', require('./routes/todos'))

app.all('/', (request, response, next) => {
    response.redirect('/todos')
})


app.use((request, response) => {
    response.status(404)
    response.end('Not Found')
})

app.listen(8080)