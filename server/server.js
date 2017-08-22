const express = require('express');
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

//GMAIL API 
// const passport = require('passport')
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GoogleInit = require('./gmailQuickstart')

const port = process.env.PORT || 8000
const app = express();
const directory = process.env.PUBLIC || 'client/dist';

//initializes google oauth
// GoogleInit()

//routes 
const sendEmail = require('./sendEmail')
const failoverAws = require('./failover.aws')
const failoverGmail = require('./failover.gmail')



app.use('/', express.static(directory));
// middleware 
app.use(session({secret: 'some secret', resave: false, saveUninitialized: false}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/sendEmail',cors(), sendEmail)
app.use('/api/failover', failoverAws)

app.use((req, res, next) => {
  console.log(req.query)
  let err = new Error('ERROR 404 Sorry can\'t find what you\'re looking for!');
  err.status = 404;
  next(err);
});

// error handler
app.use( (err, req, res) =>{
  console.log('UNKNOWN ERROR')
  console.log(err.stack);
  let status = err.status || 500;
  res.status(status).send(err.message);
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));

module.exports = app;