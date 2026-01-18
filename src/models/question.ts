import {Schema, model} from 'mongoose';

const McqQuestionSchema = new Schema({
    question: {type: String, required: true},
    options: [{type: String, required: true}],
    correctOptionIndex: {type: Number, required: true},
    domainId: {type: Schema.Types.ObjectId, ref: 'Domain', required: true},
});

const TextQuestionSchema = new Schema({
    Question: {type: String, required: true},
    domainId: {type: Schema.Types.ObjectId, ref: 'Domain', required: true},
});


export const McqQuestion = model('McqQuestion', McqQuestionSchema);
export const TextQuestion = model('TextQuestion', TextQuestionSchema);