const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: 'customer'
    }
});


UserSchema.statics.findById = async function(userId) {
    try {
        return await this.findOne({ _id: userId });
    } catch (error) {
        throw new Error('Could not find user by ID');
    }
};

UserSchema.statics.findByName = async function(fullname) {
    try {
        return await this.find({ fullname: fullname });
    } catch (error) {
        throw new Error('Could not find user by name');
    }
};

UserSchema.statics.deleteUserById = async function(userId) {
    try {
        return await this.deleteOne({ _id: userId });
    } catch (error) {
        throw new Error('Could not delete user by ID');
    }
};

UserSchema.statics.editUserById = async function(userId, updateData) {
    try {
        return await this.findOneAndUpdate({ _id: userId }, updateData, { new: true });
    } catch (error) {
        throw new Error('Could not edit user by ID');
    }
};

module.exports = mongoose.model('User', UserSchema);
