import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {type: String, required: true},
    regNo: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    branch: {type: String, required: true},
    githubLink: {type: String, required: true, unique: true},
    leetcodeLink: {type: String, required: true, unique: true},
    selectedDomainIds: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Domain' }],
        validate: {
            validator: function (arr: Schema.Types.ObjectId[]) {
            return arr.length <= 2 && new Set(arr.map(String)).size === arr.length;
            },
            message: 'Select at most 2 unique domains'
        }
    }
});

export const User = model('User', userSchema);