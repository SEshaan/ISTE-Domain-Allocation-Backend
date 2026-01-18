import {model, Schema} from 'mongoose';

const selectionSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    domainIds: [{type: Schema.Types.ObjectId, ref: 'Domain', required: true}],
});

export const Selection = model('Selection', selectionSchema);