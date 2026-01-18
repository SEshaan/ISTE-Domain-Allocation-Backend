import {Schema, model} from 'mongoose';

const submissionSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    taskId: {type: Schema.Types.ObjectId, ref: 'Task', required: true},
    repoLink: {type: String, required: true},
    dockLink: {type: String, required: true},
    otherLink: {type: String},
    submittedAt: {type: Date, default: Date.now},
});

export const Submission = model('Submission', submissionSchema);