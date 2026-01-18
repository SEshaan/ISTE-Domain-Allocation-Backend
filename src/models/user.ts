import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {type: String, required: true},
    regNo: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    branch: {type: String, required: true},
    githubLink: {type: String},
    leetcodeLink: {type: String},
});

export const User = model('User', userSchema);