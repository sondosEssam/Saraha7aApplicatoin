import nodemailer from 'nodemailer';

export async function sendEmailService({to,subject,message,attachment=[]} = {}) {
    //configrations
    const transporter =nodemailer.createTransport({
        host:'localhost',
        port: 587,
        secure:false,
        service:'gmail',
        auth:{
            user:"sondosessam713@gmail.com",
            pass:'ythr rdwx itoe oequ'
        },
        // tls:{
        //     rejectUnauthorized:false
        // }
    }
)
// console.log(transporter);


    //email

    const emailInfo =  transporter.sendMail({
        from:'sondosessam713@gmail.com',
        to:to?to:'',
        subject:subject?subject:'subject',
        html:message?message:'<h1>no meeesgaes sent </h1>',
        // text:'text sent successfylly',
        attachments:attachment
    })

// console.log(emailInfo)
}