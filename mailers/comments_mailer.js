const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log("Inside new comment mailer");
    nodemailer.transporter.sendMail({
        from: 'nocial.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: '<h1> Your comment is now Published </h1>'
    },
    (err, info) => {
        if(err){ console.log('Error in sending mail: ',err); return; }

        console.log("Message Sent");
        return;
    });
}