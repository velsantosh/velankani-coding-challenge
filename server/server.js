var app = require('express')();
var cors = require('cors');
app.use(cors({ credentials: true, origin: '*:*' }));

var fs = require('fs');

var options = {
    key: fs.readFileSync('../certificate/vcctBlrVelankani.key', 'utf8'),
    cert: fs.readFileSync('../certificate/vcctBlrVelankani.crt', 'utf8'),
    passphrase: 'password'
};

var server = require('https').createServer(options, app);
//var server = require('https').createServer(app);
//var server = require('https').Server(app);

//server.setTimeout(60000);
server.listen(8000, '0.0.0.0');
//server.listen(8000);

const io = require('socket.io').listen(server);
//const redis = require('socket.io-redis');
//io.adapter(redis({host :'vcct.blr.velankani.com', port : 8000}))


io.on('connection', function (socket) {
    socket.on('join', function (data) {
        debugger;
        socket.join(data.roomId);
        socket.room = data.roomId;
        const sockets = io.of('/').in().adapter.rooms[data.roomId];
        console.log("sockets.length = ", sockets.length)

        if (sockets.length === 1) {
            socket.emit('init')
        } else {
            if (sockets.length <= 10) {
                console.log("sockets.length===2", data.roomId)
                io.to(data.roomId).emit('ready')
            } else {
                socket.room = null
                console.log("sockets.length = ", sockets.length)

                socket.leave(data.roomId)
                socket.emit('full')
            }

        }
    });
    socket.on('signal', (data) => {
        io.to(data.room).emit('desc', data.desc)
    })
    socket.on('disconnect', () => {
        const roomId = Object.keys(socket.adapter.rooms)[0]
        if (socket.room) {
            io.to(socket.room).emit('disconnected')
        }

    })
});