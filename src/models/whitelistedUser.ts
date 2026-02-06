import { Schema, model } from 'mongoose';

const whitelistedUserSchema = new Schema({
    email: {type: String, required: true, unique: true}
});

export const WhitelistedUser = model('WhitelistedUser', whitelistedUserSchema);