require('dotenv').config();

const development = {
    name: 'development',
    asset_path: 'assets',
    session_cookie_key: 'nocial',
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
    jwt_secret: 'nocial',
}

const production = {
    name: 'production',
}

module.exports = development;