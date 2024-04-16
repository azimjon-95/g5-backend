const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthday: { type: String },
    gender: { type: String },
    address: { type: String },
    phone: { type: Number },
})
const User = model("users", userSchema)
module.exports = User;