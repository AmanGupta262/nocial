module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer, {
        cors: {
            origin: '*',
        }
    });

    io.sockets.on('connection', function(socket){
        console.log('New connection received: ', socket.id);

        socket.on('disconnect', function(){
            console.log('Socket disconnected!');
        });

        socket.on('join_room', function(data){
            console.log('Joining request received: ', data);

            socket.join(data.chatroom);

            io.in(data.chatrom).emit('user_joined', data);
        });
    });
};