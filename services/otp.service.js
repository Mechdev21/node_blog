const mailSender = require('../utilities/mail.utility');

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

module.exports = sendVerificationEmail;

// class OTPServices {
//     async generateAndSendOTP (email) {
//         let otp = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

//         // const otpRecord = new OTP({ email, otp });
//         // await otpRecord.save();
//         // await this.sendVerificationEmail(email, otp);
//         // return otp

//         let result = await OTP.findOne({ otp: otp });
//         while (result) {
//             otp = otpGenerator.generate(6, {
//                 upperCaseAlphabets: false,
//             });
//             result = await OTP.findOne({ otp: otp});
//         }
//         const otpPayLoad = {email, otp };
//         const otpBody = await OTP.create(otpPayLoad);
//         await this.sendVerificationEmail(email, otp);
//         return otp;
//     }

//     async sendVerificationEmail( email, otp) {
//         try {
//             const mailResponse = await mailSender(
//                 email,
//                 "Verification Email",
//                 `<h1>Please confirm your OTP</h1>
//                 <p>Here is your OTP code: ${otp}</p>`
//             );
//             console.log("Email sent successfully: ", mailResponse);
//         } catch (err) {
//             console.log("Error occured while sending email: ", err)
//             throw err;
//         }
//     }

//     async verifyOTP (email, otp) {
//         const otpRecord = await OTP.findOne({ email, otp, isVerified: false });
//         if (!otpRecord) {
//             throw new Error('invalid or expired OTP');
//         }
//         otpRecord.isVerified = true;
//         await otpRecord.save();
//         return true;
//     }
// }

// const otpService = new OTPServices();

// module.exports = otpService;