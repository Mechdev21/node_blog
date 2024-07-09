const otpGenerator = require('otp-generator');
const mailSender = require('../utilities/mail.utility');

const generateOTP = async () => {
    let otp = await otpGenerator.generate(6, 
        {upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false });

        return otp;
}

const sendVerificationEmail = async ( email, otp) => {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${otp}</p>`
        );
        console.log("Email sent successfully: ", mailResponse);
    } catch (err) {
        console.log("Error occured while sending email: ", err)
        throw err;
    }
}



module.exports = generateOTP;