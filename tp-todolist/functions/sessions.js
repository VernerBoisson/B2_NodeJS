const database = require('sqlite')

module.exports = {
    postSession(userId, accessToken, created_at, expires_at){
        return database.run('INSERT INTO sessions (userID, accessToken, created_at, expires_at) VALUES (?, ?, ?, ?);'
        , userId, accessToken, created_at, expires_at)
    },
    deleteSession(id){
        return database.run('DELETE FROM sessions WHERE id = ?;', id)    
    },
    getSession(){
        return database.all('SELECT * FROM sessions')
    },
    getSessionByToken(accessToken){
        return database.get('SELECT * FROM sessions WHERE accessToken = ?', accessToken)
    }
  }