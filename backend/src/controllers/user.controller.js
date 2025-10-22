import User from '../models/user.model.js';
import cloudinary from '../libraries/cloudinary.js'


export const getProfile = async (req, res) => res.status(200).json(req.user);

export const updateProfile = async (req, res) => {
    const { profilePicture } = req.body;
    try {
        if (!profilePicture) {
            return res.status(400).json({ message: 'Please provide one picture to profile!' });
        }

        if (!/^data:image\/(png|jpe?g|webp);base64,/.test(profilePicture)) {
            return res.status(400).json({ message: 'Invalid image format!' });
        }

        const approximateSize = (profilePicture.length * 3) / (4 * 1024 * 1024);
        if (approximateSize > 5) {
            return res.status(413).json({ message: 'Image size must be less than 5MB!' });
        }

        const userId = req.user._id;

        const options = {
            folder: `realtime-chat/${userId}`,
            public_id: 'avatar',
            resource_type: 'image',
            overwrite: true,
            invalidate: true,
            transformation: [ { width: 256, height: 256, crop: 'fill', gravity: 'face' } ]
        };
        const response = await cloudinary.uploader.upload(profilePicture, options);


        const userUpdated = await User.findByIdAndUpdate(userId, { profilePicture: response.secure_url }, { new: true });

        res.status(200).json(userUpdated);

    } catch (error) {
        console.warn('An error occurred while trying request path update-profile!');
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ message: 'An error occurred while processing your request!' });
    }
};