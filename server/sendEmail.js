const express = require('express');
const router = express.Router();





// //sendgrid api 

const { API_KEY } = require('./config').SENDGRID

const sg = require('sendgrid')(API_KEY);

router.post('/', async (req, res, next) => {
  console.log('request \n \n ', req.body)
  const helper = require('sendgrid').mail;

  let { toEmail, fromEmail, subject, body, attachments = [] } = req.body
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      "personalixzations": [
        {
          "to": toEmail.map(emailAdress => ({"email": emailAdress}) ),
          "subject": subject
        }
      ],
      "from": {
        "email": fromEmail
      },
      "content": [
        {
          "type": "text/html",
          "value": body
        }
      ],
      "files": attachments
    }
  })

  try {

    let response = await sg.API(request)
    console.log('sent successfully')
    res.send()    

  } catch (error) {


    // stores the mail object in the session to be used by the failover route
    req.session.mail = {
      toEmail: toEmail,
      fromEmail: fromEmail,
      subject: subject,
      body: body
    }

    // if there is an error for whatever reason, it will try the failover route
    console.log("THERE WAS AN ERROR'", error , "\n ")
    console.log(' Now Trying failover server.... \n \n \n' )
    res.redirect(302, '/failover')
  }
})

module.exports = router;
