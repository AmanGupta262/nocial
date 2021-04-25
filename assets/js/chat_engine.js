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
        })
    }
}