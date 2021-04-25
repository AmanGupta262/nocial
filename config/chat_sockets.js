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

            socket.join(data.chat_room);

            io.in(data.chat_room).emit('user_joined', data);
        });

        socket.on('send_message', function(data){
            io.in(data.chat_room).emit('receive_message', data);
        });
    });

};