const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();



const { user, pass } = require('./config').GMAIL

router.get('/', async (req, res,next) => {

  console.log('Still loading... \n \n ')







  let { toEmail, fromEmail, subject, body, attachments = [] } = req.session.mail

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,

    secure: true,
    auth: {
        user: user,
        pass: pass
    }
  });

  try {    
    let response = await transporter.sendMail({
      from: fromEmail, 
      to: toEmail, 
      subject: subject, 
      text: body, 
      html: body,
      attachments: attachments,
  })
    console.log('sent successfully')
    res.send('sent successfully')

  } catch (error) {
    console.log('THERE WAS AN ERROR: \n \n ', error)
    return res.status(500)

  }


})

module.exports = router;
