require('dotenv').config();
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: 'public/assets',
    session_cookie_key: 'elBlcAcfTZZkBX197vuc6p4K3HkvAa14',
    db: 'nocial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    },
    google_oauth_client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    google_oauth_client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    google_oauth_callback_url: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    jwt_secret: 'ZWGUEuaN8vl45aN0zloy1wTl1AlkVVME',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: 'production',
    asset_path: process.env.ASSETS_PATH,
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    db: process.env.DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        }
    },
    google_oauth_client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    google_oauth_client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    google_oauth_callback_url: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    jwt_secret: process.env.JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}

module.exports = eval(process.env.NOCIAL_ENVIRONMENT == undefined ? development : eval(process.env.NOCIAL_ENVIRONMENT));