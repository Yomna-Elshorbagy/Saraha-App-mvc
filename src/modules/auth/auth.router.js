import { Router } from "express";
import { handleLogin, login, register , handleRegister} from "./auth.controllers.js";
import { validate } from "../../middelwares/isValidate.js";
import { handleLoginVal, handleRegisterVal } from "./auth.validation.js";

const authRouter = Router()

authRouter.get('/login', login)
authRouter.get('/register', register)
authRouter.post('/handleLogin',validate(handleLoginVal, '/auth/login'), handleLogin)
authRouter.post('/handleRegister',validate(handleRegisterVal, '/auth/register'), handleRegister)

export default authRouter