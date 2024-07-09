const nodemailer = require('nodemailer');
const configVariable = require('../config/config');

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Always use smtp.gmail.com for Gmail
            port: 465, // Use 465 for SSL
            secure: true, // Use true for port 465
            auth: {
                user: configVariable.MAIL_USER,
                pass: configVariable.MAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from: configVariable.MAIL_USER,
            to: `${email}`,
                subject: `${title}`,
                html: `${body}`,
        })
        console.log("info is here: ", info)
        return info;
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = mailSender;