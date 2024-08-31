import joi from "joi"

const passPattern = /^[A-Z][A-Za-z0-9]{5,20}$/;

export const handleLoginVal = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(passPattern)).required(),
})

export const handleRegisterVal = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp(passPattern)).required(),
    cpass: joi.valid(joi.ref('password')).required(),
})