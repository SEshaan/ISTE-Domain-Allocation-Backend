import {Schema, model} from 'mongoose';

const adminSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
});

export const Admin = model('Admin', adminSchema);