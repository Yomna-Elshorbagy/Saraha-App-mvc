import { Message } from "../../../database/models/message.model.js"
import { User } from "../../../database/models/user.model.js"
import { catchAsyncError } from "../../utils/catchError.js"

export const getUser = (req, res, next) => {
    res.render('user.ejs', { userId: req.params.id , error : req.query.error})
}

export const sendMessage = catchAsyncError(async(req, res ,next) =>{
    const { message } = req.body
    const userId = req.params.id;

    const userExist = await User.findById(userId)
    if(!userExist) {
        return res.redirect('/user/send?error= user doesnot exist')
    }
    // req.body.user = userId
    await Message.create({ message, user: userId });
    res.redirect(`/user/${userId}`);
})