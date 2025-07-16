const nodemailer = require('nodemailer');

const tranporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587, // use TLS port
    secure: false, // TLS, not SSL
    auth: {
        user: 'dhratikaushik05@gmail.com',
        pass: 'halz xnfy kxbp ehym'
    },
    tls: {
        rejectUnauthorized: false // if you're on sketchy Wi-Fi
    }
});

async function sendMail(to, sub, msg) {
    try {
        let info = await tranporter.sendMail({
            to: to,
            subject: sub,
            html: msg
        });
        console.log("💌 Email Sent:", info.response);
    } catch (err) {
        console.error("😡 Email Failed:", err);
    }
}

sendMail("dhratikaushik05@gmail.com", "This is subject", "This is text message");
