const database = require('sqlite')
const crypto = require('crypto')
const file_name = 'todolist.db'

module.exports = {
    getDate(){
        return new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric' })
    },
    // SHEMA SQL a vérifier
    createDatabase(){
        database.open(file_name).then(()=>{
            return Promise.all([
                database.run("CREATE TABLE IF NOT EXISTS todos (id integer primary key autoincrement, message, completion, created_at, update_at, user_id)"), 
                database.run("CREATE TABLE IF NOT EXISTS users (id integer primary key autoincrement, firstname, lastname, username, password, email, created_at, update_at, role_id)"),
                database.run("CREATE TABLE IF NOT EXISTS sessions (id integer primary key autoincrement, userID, accessToken, created_at, expires_at)"),                
                database.run("CREATE TABLE IF NOT EXISTS roles (id integer primary key autoincrement, name, isUserManage, isTodoManage )")
            ])
        }).then((values)=>{
            //return database.run("INSERT INTO roles(name, isUserManage, isTodoManage) VALUES (admin, true, true);")
        }).then(()=>{
            console.log('Database Ready')
        }).catch((error)=>{
            console.log(error)
        })
    },
    createToken(){
        return new Promise(function(resolve, reject) {
            let token
            crypto.randomBytes(48, function(err, buffer) {
                token = buffer.toString('hex')
                resolve(token);
            })
          });
    }    
  }