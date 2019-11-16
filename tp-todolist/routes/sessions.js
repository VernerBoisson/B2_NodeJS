const router = require('express').Router()
const session = require('./../functions/sessions')
const users = require('./../functions/users')
const bcrypt = require('bcrypt')
const utils = require('./../functions/utils')

router.get('/', (request, response, next) => { 
    response.render('users/pass',{ })
})


router.post('/', (request, response, next) => {
    let user, token;
    let date = new Date()
    users.getUserbyUsername(request.body.username)
        .then((values)=>{
            user = values
            if (values)
                return bcrypt.compareSync(request.body.password, values.password)
            else
                throw Error(0)
        })
        .then((compare) => {
            if (compare){
                return utils.createToken()
            }
            else
                throw Error(1)
        }).then((values)=>{
            token = values
            return response.cookie('AccessToken', values)
        }).then(()=>{
            return session.postSession(user.id, token, date, date)
        }).then(()=>{
            response.redirect('/')
        }).catch((error)=>{
            switch(error.message){
                case '0':
                    response.render('users/pass',{
                        error: "L'username ou le mot de passe sont incorrect."
                    })
                    break;
                case '1':
                    response.render('users/pass',{
                        error: "L'username ou le mot de passe sont incorrect."
                    })
                    break
                default:
                    response.status(500).send(error)
            }
        })
})


router.delete('/', (request, response, next) => { 
    session.getSessionByToken(request.cookies.AccessToken)
    .then(values=>{
        session.deleteSession(values.id)
    }).then(
        response.redirect('/')
    ).catch((error)=>{
        response.status(500).send(error)
    })
})


module.exports = router