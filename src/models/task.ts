import {Schema, model} from 'mongoose';

const taskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    dueDate: {type: Date, required: true},
    domainId: {type: Schema.Types.ObjectId, ref: 'Domain', required: true},
});

export const Task = model('Task', taskSchema);