const router = require('express').Router()
const utils = require('./../functions/utils')
const todos = require('./../functions/todos')
const sessions = require('./../functions/sessions')


router.get('/', (request, response, next) => {
    let order
    let asc = "ASC"
    return sessions.getSessionByToken(request.cookies.AccessToken)
    .then((values)=>{
        if(request.query.order && request.query.asc == "ASC"){
            order = request.query.order
            asc = "DESC"
            return todos.getAllByUserWithOrder(values.userID, request.query.order, request.query.asc)
        }else if(request.query.order && request.query.asc == "DESC"){
            order = request.query.order
            asc = "ASC"
            return todos.getAllByUserWithOrder(values.userID, request.query.order, request.query.asc)
        }else{
            return  todos.getAllByUser(values.userID)
        }
    }).then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.render('index',{
                    todos: values,
                    order: order,
                    url: "/todos",
                    asc: asc
                })
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        console.log(error)
        response.status(500).send(error)
    })
})


router.get('/add', (request, response, next)=>{
    response.render('todos/edit',{ 
        methode : 'POST'
    })
})


router.get('/:todoID/edit', (request, response, next)=>{
    return todos.getTodo(request.params.todoID)
    .then((values)=>{
        response.render('todos/edit',{
            method : 'PATCH',
            todo: values
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


router.get('/:todoID', (request, response, next) => {
    return todos.getTodo(request.params.todoID)
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.render('todos/show',{
                    todo: values
                })
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


router.post('/', (request, response, next) => {
    let date = utils.getDate()
    return sessions.getSessionByToken(request.cookies.AccessToken)
    .then((values)=>{
    return todos.postTodo(request.body.message, Boolean(request.body.completion), date, values.userID)
    }).then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.redirect('/')
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


router.patch('/:todoID', (request, response, next)=>{
    let date = utils.getDate()
    return todos.patchTodo(request.params.todoID, request.body.message, request.body.completion, date)
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.redirect('/')
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


router.delete('/:todoID', (request, response, next) => {
    return todos.deleteTodo(request.params.todoID)
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.redirect('/')
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


module.exports = router