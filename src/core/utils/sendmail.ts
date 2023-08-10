
import nodeMailer from 'nodemailer'

import { OAuth2Client } from 'google-auth-library'
import dotenv from "dotenv";
import Logger from './logger';

// *Useful for getting environment vairables
dotenv.config();
// const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID
// const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET
// const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN
// const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL

const sendMail = async (to: string, subject: string, htmlContent: any) => {
    const myOAuth2Client = new OAuth2Client(
        process.env.GOOGLE_MAILER_CLIENT_ID,
        process.env.GOOGLE_MAILER_CLIENT_SECRET
    )

    myOAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
    })

    const myAccessTokenObject = await myOAuth2Client.getAccessToken()
    // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
    const myAccessToken = myAccessTokenObject?.token
    // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
    const transport = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.ADMIN_EMAIL,
            accessToken: myAccessToken as string,
            refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
            clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
            clientId: process.env.GOOGLE_MAILER_CLIENT_ID
        },
    })

    const options = {
        from: process.env.ADMIN_EMAIL,
        to: to,
        subject: subject,
        html: htmlContent,
        replyTo: process.env.ADMIN_EMAIL,
    }


    return transport.sendMail(options).catch(err => {
        Logger.error(err)
    })
}



export default { sendMail: sendMail };