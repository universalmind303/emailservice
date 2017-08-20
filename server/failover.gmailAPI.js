// const fs = require('fs')
// const google = require('googleapis');
// const OAuth2 = google.auth.OAuth2;
// const gmail = google.gmail('v1.js')
// var googleAuth = require('google-auth-library');
// var auth = new googleAuth();
// var Base64 = require('js-base64').Base64;

// var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//     process.env.USERPROFILE) + '/.credentials/';
// var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

// const {client_id, client_secret, redirect_uris} = require('./client_secret')

// var oauth2Client = new auth.OAuth2(client_id, client_secret, redirect_uris[0]);


// fs.readFile('server/client_secret.json', function processClientSecrets(err, content) {
//   if (err) {
//     console.log('Error loading client secret file: ' + err);
//     return;
//   }
//   // Authorize a client with the loaded credentials, then call the
//   // Gmail API.
//   authorize(JSON.parse(content), listLabels);
// });

// const authorize = async (credentials) => {
//   var auth = new googleAuth();

//   try {
//     let token = await fs.readFile(TOKEN_PATH) 
//     oauth2Client.credentials = JSON.parse(token)    
//   } catch (e) {
//     getNewToken(oauth2Client)
//   }
// }
// function getNewToken(oauth2Client, callback) {
//   var authUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES
//   });
//   console.log('Authorize this app by visiting this url: ', authUrl);
//   var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
//   rl.question('Enter the code from that page here: ', function(code) {
//     rl.close();
//     oauth2Client.getToken(code, function(err, token) {
//       if (err) {
//         console.log('Error while trying to retrieve access token', err);
//         return;
//       }
//       google.options({
//         auth: oauth2Client
//       })
//       oauth2Client.credentials = token;
//       storeToken(token);
//       callback(oauth2Client);
//     });
//   });
// }

// function storeToken(token) {
//   // process.env.TOKEN = token
//   try {
//     fs.mkdirSync(TOKEN_DIR);
//   } catch (err) {
//     if (err.code != 'EEXIST') {
//       throw err;
//     }
//   }
//   fs.writeFile(TOKEN_PATH, JSON.stringify(token));
//   console.log('Token stored to ' + TOKEN_PATH);
// }
// function listLabels(auth) {
//   var gmail = google.gmail('v1');
//   gmail.users.labels.list({
//     auth: auth,
//     userId: 'me',
//   }, function(err, response) {
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       return;
//     }
//     var labels = response.labels;
//     if (labels.length == 0) {
//       console.log('No labels found.');
//     } else {
//       console.log('Labels:');
//       for (var i = 0; i < labels.length; i++) {
//         var label = labels[i];
//         console.log('- %s', label.name);
//       }
//     }
//   });
// }
// function createMessage(sender, to, subject, message_text) {

//   let message = {}
//   message.to = to
//   message.from = sender
//   message.subject = subject
//   message.message_text = message_text
//   let base64EncodedEmail = Base64.encode(message)
//   // let base64EncodedEmail = b.toString('base64')


//   return ({'raw': base64EncodedEmail})
// }
//   function sendMessage(userId, email) {

//     let newEmail = createMessage(email)
//     console.log('newEmail', newEmail)
//     var request = gmail.users.messages.send({
//       userId: 'me',
//       auth: oauth2Client,
//       'resource': newEmail
//     });
//     console.log('REQUEST \n\n\n\n', request)

//   }

//   sendMessage('me',{
//       from: 'cory.grinstead@gmail.com', 
//       to: ['universalmind.candy@gmail.com'], 
//       subject: 'subject', 
//       text: 'body', 
//       html: 'body',
//   })