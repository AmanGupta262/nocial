class ChatEngine{
    constructor(chatboxId, userEmail){
        this.chatbox = $(`#${chatboxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');
        if(userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('Connection established using sockets...!');

            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chat_room: 'nocial'
            });

            self.socket.on('user_joined', function(data){
                console.log('A new user joined: ', data);
            });

            $('#send-message').click(function(){
                let msg = $('.chat-form #message').val();

                if(msg != ''){
                    self.socket.emit('send_message', {
                        message: msg,
                        chat_room: 'nocial',
                        user_email: self.userEmail
                    });
                }
            });
            
            self.socket.on('receive_message', function(data){
                console.log('Received message: ', data.message);

                let newMessage = $('<div>');

                let messageType = 'right message';

                if(data.user_email != self.userEmail){
                    messageType = 'left message';
                }
                newMessage.addClass(messageType);
                newMessage.html(data.message);

                $('.message-container').append(newMessage);
            });
        })
    }
}