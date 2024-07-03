const userInstance = require('../services/user.service');
const jwt = require('jsonwebtoken');
const configVariable = require('../config/config');
const formidable = require('formidable');
const uploadFile  = require('../utilities/upload.utility');

const registerUser = async (req, res, next) => {
    const form = formidable({ maxFileSize: 400 * 1024 * 1024 }); // 400MB limit

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return next(err);
        }

        //console.log('Fields:', fields);
        //console.log('Files:', files);

        try {
            const { username, email, password, bio, role } = fields;
            let profilepicture = '';

            if (files['profilepicture']) {
                //console.log('File received:', files['profilepicture']);
                const uploadedFile = await uploadFile(files['profilepicture'].filepath, 'intro');
                //console.log('Uploaded file URL:', uploadedFile.url);
                profilepicture = uploadedFile.url;
            } else {
                console.log('No file uploaded.');
            }

            const details = {
                username,
                email,
                password,
                bio,
                role,
                profilepicture
            };

            const newUser = await userInstance.createService(details);
            res.status(201).json(newUser);
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: err.message });
        }
    });
};


const loginUser = async (req, res) => {
    //console.log('body:', req.body);
    const { username, password } = req.body;
    try {
        const user = await userInstance.compareUsers(username);
        //console.log(user);
        if (!user) {
            return res.status(401).json({ message: "invalid username or password"});
        }
        const validPassword = await user.comparePassword(password);
        if (!validPassword) {
            return res.status(401).json({ message: "invalid username or password"});
        }
        const {password, ...others } = user._doc;
        const accessToken = jwt.sign({
            userId: user._id, roles: user.role
        }, configVariable.JWT_SECRET, {expiresIn: '3d'} )
        res.status(200).json({...others, token: accessToken}) 
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

module.exports = { registerUser, loginUser };
