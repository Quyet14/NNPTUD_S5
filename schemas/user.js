const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    status: { type: Boolean, default: false },
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    loginCount: { type: Number, default: 0, min: 0 },
    isDelete: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating user");
    }
};

const getAllUsers = async (username = '', fullName = '') => {
    try {
        const users = await User.find({
            username: { $regex: username, $options: 'i' },
            fullName: { $regex: fullName, $options: 'i' },
            isDelete: false
        });
        return users;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching users");
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).where('isDelete').equals(false);
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("User not found");
    }
};

const getUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username, isDelete: false });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("User not found");
    }
};

const softDeleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, { isDelete: true }, { new: true });
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting user");
    }
};

const updateUserStatus = async (email, username) => {
    try {
        const user = await User.findOne({ email, username, isDelete: false });
        if (!user) {
            throw new Error("User not found or deleted");
        }

        user.status = true;
        await user.save();
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating status");
    }
};

module.exports = {
    User,
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    softDeleteUser,
    updateUserStatus
};
