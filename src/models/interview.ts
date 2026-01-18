import {Schema, model} from 'mongoose';

const interviewSchema = new Schema({
    domainId: {type: Schema.Types.ObjectId, ref: 'Domain', required: true},
    date: {type: Date, required: true},
    durationMinutes: {type: Number, required: true}
});

export const Interview = model('Interview', interviewSchema);