const router = require('express').Router()
const utils = require('./../functions/utils')
const users = require('./../functions/users')
const bcrypt = require('bcrypt')


// GET
router.get('/', (request, response, next) => {
    return users.getAll()
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
            
            html: function(){
                response.render('users/list',{
                    users: values
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


router.get('/add', (request, response, next)=>{
    response.render('users/edit',{ 
        method : 'POST'
    })
})


router.get('/:userID/edit', (request, response, next)=>{
    return users.getUser(request.params.userID)
    .then((values)=>{
        response.render('users/edit',{
            method : 'PATCH',
            user : values
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})

router.get('/:userID/todos', (request, response, next)=>{
    let order
    let asc = "ASC"
    if(request.query.order && request.query.asc == "ASC"){
        order = request.query.order
        asc = "DESC"
    }else if(request.query.order && request.query.asc == "DESC"){
        order = request.query.order
        asc = "ASC"
    }
    return users.getUserTodos(request.params.userID, order, asc)
    .then((values)=>{
        response.render('todos/list',{
            todos : values,
            order: order,
            url : "/users/"+request.params.userID+"/todos",
            asc: asc
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})

router.get('/:userID', (request, response, next) => {
    return users.getUser(request.params.userID)
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
            html: function(){
                response.render('users/show',{
                    user: values
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


// POST
router.post('/', (request, response, next) => {
    let date = utils.getDate()
    bcrypt.hash(request.body.password, 10).then(function(hash) {
        return users.postUser(request.body.firstname, request.body.lastname, request.body.username, hash, request.body.email, date)
    }).then((values)=>{
        if(!values)
            throw Error(2)
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.redirect('/users')
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        switch(error.message){
            case '1':
                response.render('users/edit',{
                    error: "Username et l'email ne sont pas définis."
                })
                break;
            case '2':
                response.render('users/edit',{
                    error: "Username existe déjà."
                })
                break
            default:
                response.status(500).send(error)
        }
    })
})

// PATCH
router.patch('/:userID', (request, response, next)=>{
    let date = utils.getDate()
    return users.patchUser(request.params.userID, request.body.firstname, request.body.lastname, request.body.username, request.body.email, request.body.password, date)
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.redirect('/users')
            },
          
            json: function(){
                response.json(values);
            }
        })
    }).catch((error)=>{
        response.status(500).send(error)
    })
})


// DELETE
router.delete('/:userID', (request, response, next) => {
    return users.deleteUser(request.params.userID)
    .then((values)=>{
        response.format({
            text: function(){
                response.send(JSON.stringify(values));
            },
          
            html: function(){
                response.redirect('/users')
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