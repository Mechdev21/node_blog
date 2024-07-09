const UserModel = require('../models/user.model');

class UserService {
    async createService (userInfo) {
        // Check if the email already exists
        const emailExists = await UserModel.compareEmails(userInfo.email);
        if (emailExists) {
            throw new Error('Email already exists');
        }

        const newUser = new UserModel(userInfo);
        const saved = await newUser.save();
        return saved;
    }

    async findAllUser () {
        const users = await UserModel.find();
        return users;
    }

    async findOneUser (id) {
        const oneUser = await UserModel.findOne({ _id: id });
        return oneUser;
    }

    async compareUsers (username) {
        const uniqueUser = await UserModel.findOne({ username: username });
        return uniqueUser;
    }

    async deleteOneUser (id) {
        const deleted = await UserModel.findOneAndDelete({ _id: id });
        return deleted;
    }

    async updateOneUser (id, userInfo) {
        const updated = await UserModel.findOneAndUpdate({ _id: id}, userInfo, { new: true });
        return updated;
    }

    async validateUserSignUp (email, otp) {
        const user = await UserModel.findOne({ email: email});
        if (!user) {
            return [false, 'user not found']
        }
        if (user && user.otp !== otp) {
            return [false && 'Invalid OTP']
        } else {
            return [user, 'Email verifed Successfully']
        }
    }
};

const userService = new UserService();

module.exports = userService;