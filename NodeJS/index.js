const express = require('express')
const database = require('./database.js')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const config = {
    host: 'localhost',
    user: 'root',
    password: 'ching', /* your db password here*/
    database: 'chat_data'
};
const db = new database(config);

app.post('/login', (req,res) => {
    let user = req.body.username;
    let pw = req.body.password;
    login(user,pw).then(results => {res.send(results)})
})

app.post('/regist', (req,res) => {
    let user = req.body.username;
    let pw = req.body.password;
    regist(user,pw).then(results => {res.send(results)})
})

app.post('/getUserGroup' , (req,res) => {
    let username = req.body.username;
    console.log(username);
    getUserGroup(username).then(results => {res.send(results)})
})

app.post('/getAllGroup', (req,res) =>{
    
})


async function getUserGroup(username){
    try{
        const results = await db.query('SELECT G.groupName, M.text, M.timeStamp \
                                    FROM groupmember GM NATURAL JOIN chat_data.`group` G \
                                    NATURAL JOIN message M \
                                    where userId= ?', username);
        return {
            valid : true,
            groupList : results
        }
    }catch(e){
        return {valid : false}
        console.log("from getUserGroup " + e);
    }
}

async function regist(username,pw){
    try {
        await db.query('INSERT INTO user (userId, password, color) \
        VALUES ("'+ username + '","' + pw + '","#7265E6")')
            return ({
                valid: '1',
            })
    } catch (e) {
        console.log("from regist: " + e)
        return ({ valid: '-1' })
    }
}

async function login(username, pw) {
    try {
        const results = await db.query('SELECT U.password, U.userId, U.color\
                                    FROM user U\
                                    where userId= ?', username)
        console.log(results[0].password);
        if (results.length === 1 && results[0].password === pw) {
            return ({
                valid: true,
                userInformation : { username : results[0].userId,
                                    color : results[0].color
                }
            })
        } else throw new Error('invalid')
    } catch (e) {
        console.log("from login: " + e)
        return ({ valid: false })
    }
}

app.listen(8000, () => console.log('Server is running on port 8000!'))
