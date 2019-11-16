const database = require('sqlite')

module.exports = {
    getAll(){
        return database.all('SELECT * FROM todos')
    },
    getAllByUser(userID){
        return database.all('SELECT * FROM todos WHERE user_id = ?', userID)
    },
    getAllByUserWithOrder(userID, order, asc){
        return database.all(`SELECT * FROM todos WHERE user_id = ? ORDER BY ${order} ${asc}`, userID)
    },
    getTodo(id){
        return database.get('SELECT * FROM todos WHERE id = ?;', id)
    },
    postTodo(message, completion, date, userID){
        return database.run('INSERT INTO todos (message, completion, created_at, update_at, user_id) VALUES (?, ?, ?, ?, ?);'
        , message, completion, date, date, userID)
    },
    patchTodo(id, message, completion, date){
        return database.run('UPDATE todos SET message = ?, completion = ? , update_at = ? WHERE id = ?;'
        , message, completion, date, id)
    },
    deleteTodo(id){
        return database.run('DELETE FROM todos WHERE id = ?;', id)    
    }
  }