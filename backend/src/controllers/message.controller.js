import Message from '../models/message.model.js';
import User from '../models/user.model.js';
import cloudinary from '../libraries/cloudinary.js';


export const getContacts = async (req, res) => {
    const userId = req.user._id;
    try {
        const users = await User
            .find({ _id: { $ne: userId } }, {}, undefined)
            .select('-password');

        return res.status(200).json(users);

    } catch (error) {
        console.warn('An error occurred while trying request path contacts!');
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ message: 'An error occurred while processing your request!' });
    }
};

export const getMessagesByUserId = async (req, res) => {
    const userId = req.user._id;
    const { id: receiverId } = req.params;
    try {
        const messages = await Message
            .find({ $or: [{ senderId: userId, receiverId: receiverId }, { senderId: receiverId, receiverId: userId }] }, {}, undefined)
            .sort({ createdAt: 1 });

        return res.status(200).json(messages);

    } catch (error) {
        console.warn('An error occurred while trying request path messages!');
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ message: 'An error occurred while processing your request!' });
    }
}

export const getChatPartners = async (req, res) => {
    const userId = req.user._id;
    try {
        const messages = await Message
            .find({ $or: [{ senderId: userId }, { receiverId: userId }] }, {}, undefined)
            .sort({ createdAt: 1 });

        const chatPartnersIds = [...new Set(
            messages.map(message => message.senderId.toString() === userId.toString() ? message.receiverId : message.senderId)
        )];

        const chatPartners = await User.find({ _id: { $in: chatPartnersIds } }, {}, undefined).select('-password');

        return res.status(200).json(chatPartners);

    } catch (error) {
        console.warn('An error occurred while trying request path chat-partners!');
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ message: 'An error occurred while processing your request!' });
    }
};

export const sendMessage = async (req, res) => {
    const userId = req.user._id;
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    try {
        if (!text && !image) {
            return res.status(400).json({ message: 'Please provide at least one message!' });
        }

        if (userId === receiverId) {
            return res.status(400).json({ message: 'You cannot send a message to yourself!' });
        }

        const receiverExists = await User.exists({_id: receiverId});
        if (!receiverExists) {
            return res.status(404).json({ message: 'Receiver not found!' });
        }

        let imageURL = undefined;
        if (image) {
            const response = await cloudinary.uploader.upload(image, {});
            imageURL = response.secure_url;
        }

        const newMessage = new Message({ senderId: userId, receiverId: receiverId, text: text, image: imageURL });
        const messageSaved = await newMessage.save();

        return res.status(201).json(messageSaved);

    } catch (error) {
        console.warn('An error occurred while trying request path send!');
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ message: 'An error occurred while processing your request!' });
    }
}