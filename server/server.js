var app = require('express')();
var cors = require('cors');
app.use(cors({credentials: true, origin: '*:*'}));
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8000,() => {
    console.log(`Signalling Server running on port: 8000`)});

io.on('connection', function (socket) {
    socket.on('join', function (data) {
        socket.join(data.roomId);
        socket.room = data.roomId;
        const sockets = io.of('/').in().adapter.rooms[data.roomId];
        console.log("sockets.length = ", sockets.length )

        if(sockets.length===1){
            socket.emit('init')
        }else{
            if (sockets.length <= 10){
                console.log("sockets.length===2", data.roomId)
                io.to(data.roomId).emit('ready')
            }else{
                socket.room = null
                console.log("sockets.length = ", sockets.length )

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
        if (socket.room){
            io.to(socket.room).emit('disconnected')
        }
        
    })
});
