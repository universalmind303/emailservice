const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const { user, pass } = require('./config').GMAIL

router.get('/', (req, res,next) => {
  let { toEmail, fromEmail, subject, body, attachments = [] } = req.session.mail

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass
    }
  });
  transporter.sendMail({
      from: fromEmail, 
      to: toEmail, 
      subject: subject, 
      text: body, 
      html: body,
      attachments: attachments,
  })
  .then((response) =>{
    console.log('sent successfully')
    res.send(response)    
  })
  .catch((error) =>{
    console.log('THERE WAS AN ERROR: \n \n ', error)
    return res.status(500)
  })
})

module.exports = router;
