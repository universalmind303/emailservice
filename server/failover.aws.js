const nodemailer = require('nodemailer');


const express = require('express');
const router = express.Router();


// configure AWS SDK

const AWS = require('aws-sdk');

let {ACCESS_ID, SECRET } = require('./config').FAILOVER.aws

AWS.config = new AWS.Config();
AWS.config.accessKeyId = ACCESS_ID;
AWS.config.secretAccessKey = SECRET;
AWS.config.update({region:'us-west-2'});

// create Nodemailer SES transporter

router.get('/', async (req, res,next) => {
  let { toEmail, fromEmail, subject, body, attachments = [] } = req.session.mail

  const transporter = nodemailer.createTransport({
    SES: new AWS.SES({
      apiVersion: '2010-12-01',
      sendingRate: 1

    })
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
    res.end()
  }



})

module.exports = router;