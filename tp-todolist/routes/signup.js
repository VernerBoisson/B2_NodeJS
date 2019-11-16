const router = require('express').Router()
const utils = require('./../functions/utils')
const users = require('./../functions/users')
const bcrypt = require('bcrypt')

router.get('/', (request, response, next) => {
    response.render("signup")
})

router.post('/', (request, response, next) => {
    let date = utils.getDate()
    new Promise(function(resolve, reject) {
        if(request.body.username && request.body.email)
            resolve(users.getUserbyUsername(request.body.username))
        else
            reject(1)
      }).then(()=>{
            return users.getUserbyUsername(request.body.username)
      }).then(values=>{
          console.log(values)
            if(values)
                throw new Error(2)
            else
                return
      }).then(
        bcrypt.hash(request.body.password, 10).then(function(hash) {
        return users.postUser(request.body.firstname, request.body.lastname, request.body.username, hash, request.body.email, date)
        })).then((values)=>{
            response.format({
                text: function(){
                    response.send(JSON.stringify(values));
                },
              
                html: function(){
                    response.redirect('/sessions')
                },
              
                json: function(){
                    response.json(values);
                }
            })
        }).catch((error)=>{
        switch(error.message){
            case '1':
                response.render('signup',{
                    error: "Username et l'email ne sont pas définis."
                })
                break;
            case '2':
                response.render('signup',{
                    error: "Username existe déjà."
                })
                break
            default:
                response.status(500).send(error)
        }
    })
})

module.exports = router
