import { model, Schema } from "mongoose";

const schema = new Schema({
    message:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2000
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    timestamps: true
})
export const Message = model('Message', schema)