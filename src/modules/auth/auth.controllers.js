import { User } from "../../../database/models/user.model.js"
import { catchAsyncError } from "../../utils/catchError.js"
import { comparePass, hashedPass } from "../../utils/hash-compare.js"


export const login = (req, res, next) => {
    res.render('login.ejs', { error : req.query.error})
}

export const handleLogin = catchAsyncError( async(req, res, next) => {
    const { email , password } = req.body;
    const userExist = await User. findOne({ email });
    if(!userExist){
        return res.redirect('/auth/login?error= invalid credential')
    }
    const comparedpass = comparePass({password, hashPass: userExist.password})
    if(!comparedpass) return res.redirect('/auth/login?error= invalid credential')
    // res.cookie('userId', userExist._id.toString())

    req.session.isLoggedIn = true;
    req.session.email =  userExist.email;
    req.session.userId =userExist._id.toString();
    res.redirect('/message')
})

export const register = (req, res, next) => {
    res.render('register.ejs', { error: req.query.error })
}

export const handleRegister =catchAsyncError( async (req, res, next) => {
    //get data
    const {name , email, password , cpass} = req.body;
    // check user exist 
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.redirect('/auth/register?error=user already exist')
    }
    if (password !== cpass) {
        return res.redirect('/auth/register?error=Password and confirmation do not match');
    }
    const hashedPassword = hashedPass({ password });
    try {
        await User.create({ name, email, password: hashedPassword });
        res.redirect('/auth/login');
    } catch (err) {
        const errorMessage = Object.values(err.errors).map(e => e.message).join(', ');
        return res.redirect(`/auth/register?error=${encodeURIComponent(errorMessage)}`);
    }
})