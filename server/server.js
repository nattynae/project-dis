const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const moment = require('moment');

app.use(cors())

server = app.listen(5000, function(){
    console.log('server is running on port 5000')
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', {data:data, time:moment(new Date()).format("ddd, D/M/YYYY, HH:mm:ss")});
    })
});
