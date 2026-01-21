import {Schema, model} from 'mongoose';

const interviewSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    domainId: {type: Schema.Types.ObjectId, ref: 'Domain', required: true},
    date: {type: Date, required: true},
    durationMinutes: {type: Number, required: true},
    meetLink: {type: String, required: true},
});

export const Interview = model('Interview', interviewSchema);