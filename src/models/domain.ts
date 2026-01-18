import {model, Schema} from 'mongoose';

const domainSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
});

export const Domain = model('Domain', domainSchema);