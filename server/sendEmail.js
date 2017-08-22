const express = require('express');
const router = express.Router();
//sendgrid api 

const { API_KEY } = require('./config').SENDGRID

const sg = require('sendgrid')(API_KEY);

router.post('/', (req, res, next) => {

  let { toEmail, fromEmail, subject, body, attachments = [] } = req.body
  
  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      "personalizations": [
        {
          "to": toEmail.map(emailAddress => ({"email": emailAddress}) ),
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

  sg.API(request)
    .then((response) => {
      console.log('sent successfully')
      res.send(response)    
    })
    .catch((error) => {
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
  })
})


module.exports = router;