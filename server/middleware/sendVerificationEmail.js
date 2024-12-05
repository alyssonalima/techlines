import nodemailer from 'nodemailer';
// kfnh kkuf mpqq lwzb
// alyssonalima02@gmail.com
export const sendVerificationEmail = (token, email, name) => {
    const html = `
    <html> 
        <body>
            <h3>Dear ${name}</h3>
            <p>Thanks for signing up at Tech Lines!</p>
            <p>User the link below to verify your e-mail</p>
            <a href="http://localhost:3000/email-verify/${token}">Click here!</a>
        </body>
    </html>
    `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alyssonalima02@gmail.com',
            pass: 'kfnh kkuf mpqq lwzb'
        }
    });

    const mailOptions = {
        from: 'alyssonalima02@gmail.com',
        to: email,
        subject: 'Verify your e-mail address',
        html: html
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log(`E-mail sent to ${email}`);
            console.log(info.response);
        }
    });
}

