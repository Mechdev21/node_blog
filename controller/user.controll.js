const userInstance = require('../services/user.service');
const formidable = require('formidable');
const uploadFile  = require('../utilities/upload.utility');

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userInstance.findAllUser();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const getOneUser = async (req, res) => {
    const { id } = req.params;
    try {
        const oneUser = await userInstance.findOneUser(id);
        res.status(200).json(oneUser);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await userInstance.deleteOneUser(id);
        res.status(200).json(deleted);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
};

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const form = formidable({ maxFileSize: 400 * 1024 * 1024 }); // 400MB limit

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return next(err);
        }

        //console.log('Fields:', fields);
        //console.log('Files:', files);

        try {
            const { username, email, password, bio, role } = fields;
            let profilepicture;

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
            }
            const updated = await userInstance.updateOneUser( id, details);
            res.status(201).json(updated);
        } catch (err) {
            res.status(500).json({ message: err.message});S
        }
    })

}

module.exports = { getAllUsers, getOneUser, deleteUser, updateUser };