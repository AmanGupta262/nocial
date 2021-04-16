const nodemailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    console.log("Inside new comment mailer");
    nodemailer.transporter.sendMail({
        from: 'nocial.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    },
    (err, info) => {
        if(err){ console.log('Error in sending mail: ',err); return; }

        console.log("Message Sent");
        return;
    });
}