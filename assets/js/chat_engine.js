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
        this.socket.on('connect', function(){
            console.log('Connection established using sockets...!');
        })
    }
}