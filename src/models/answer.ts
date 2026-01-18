import {Schema, model} from 'mongoose';

const McqAnswerSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    questionId: {type: Schema.Types.ObjectId, ref: 'McqQuestion', required: true},
    domainId: {type: Schema.Types.ObjectId, ref: 'Domain', required: true},
    selectedOptionIndex: {type: Number, required: true}
})

const TextAnswerSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    questionId: {type: Schema.Types.ObjectId, ref: 'TextQuestion', required: true},
    domainId: {type: Schema.Types.ObjectId, ref: 'Domain', required: true},
    answerText: {type: String, required: true}
})
export const TextAnswer = model('TextAnswer', TextAnswerSchema);
export const McqAnswer = model('McqAnswer', McqAnswerSchema);