import { Router } from "express";
import { getUser, sendMessage } from "./user.controller.js";
import { validate } from "../../middelwares/isValidate.js";
import { sendMessageVal } from "./user.validation.js";

const userRouter = Router()
userRouter.get('/:id', getUser)
userRouter.post('/send/:id',validate(sendMessageVal, `/user/:id/`), sendMessage)

export default userRouter