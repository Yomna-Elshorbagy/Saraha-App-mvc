import QRCode from 'qrcode'
import { Message } from '../../../database/models/message.model.js'

export const messages = async(req, res, next) => {
    // if(req.get('cookie')) {
    if(req.session.isLoggedIn) {
        let url =`http://localhost:3000/user/${req.session.userId}`
        let qrCode = await QRCode.toDataURL(url)
        const messages = await Message.find({user: req.session.userId})
        return res.render('message.ejs', {session: req.session , url , qrCode, messages})
    }
    return res.redirect('/auth/login')
}