import joi from "joi"

export const sendMessageVal = joi.object({
    message: joi.string().min(1).max(2000).required(),
    id: joi/*.string().hex().length(24)*/.required()
})