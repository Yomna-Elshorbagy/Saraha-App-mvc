import { Router } from "express";
import { messages } from "./messages.controllers.js";

const messageRouter = Router()
messageRouter.get('/', messages);

export default messageRouter