require('dotenv').config();

const development = {
    name: 'development',
    asset_path: 'assets',
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
    google_oauth_client_id: process.env.GOOGLE_OATH_CLIENT_ID,
    google_oauth_client_secret: process.env.GOOGLE_OATH_CLIENT_SECRET,
    google_oauth_callback_url: process.env.GOOGLE_OATH_CALLBACK_URL,
    jwt_secret: 'ZWGUEuaN8vl45aN0zloy1wTl1AlkVVME',
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
    google_oauth_client_id: process.env.GOOGLE_OATH_CLIENT_ID,
    google_oauth_client_secret: process.env.GOOGLE_OATH_CLIENT_SECRET,
    google_oauth_callback_url: process.env.GOOGLE_OATH_CALLBACK_URL,
    jwt_secret: process.env.JWT_SECRET,
}

module.exports = eval(process.env.NOCIAL_ENVIRONMENT == undefined ? development : eval(process.env.NOCIAL_ENVIRONMENT));