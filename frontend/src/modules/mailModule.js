import mailService from '@/services/mailService'

export default {
    actions: {
        sendMail(context, { mailOptions }) {
            mailService.sendMail(mailOptions)
        }
    }
}