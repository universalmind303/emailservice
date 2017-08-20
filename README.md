# KOHACTIVE EMAIL SERVICE 
A simple email service with a fallback provider in case your main provider goes down.

I provided two options for the fallbacks. you can choose to use either AWS or GMAIL for the fallback providers

otherwise the email will be sent via sendgrid. 

## Setup

run `yarn install`

this will install all of the dependencies in the package.json


### API KEYS

You will have to setup a few accounts to get this up and running

#### Sendgrid
first you will need to setup a sendgrid account by following this link: [sendgrid setup](https://app.sendgrid.com/signup)

here is a shortcut to the [api keys](https://app.sendgrid.com/settings/api_keys)

from there click Create API Key

give the api key a name

for permissions allow Full Access

click Create & View

it will generate an api key.
 Save this key!!! 

insert this key into your config.js where the sendgrid api key goes. refer to `config.example.js` for further details. 

#### Google  
the way the google sender is setup, it assumes you provide a default email address to the service. 
I provided an unattended gmail that you can use. 
under the `config.js` 
simply input your user and pass associated with a gmail account. 

if you are used my unattended gmail, insert

user: `reply.corygrinstead@gmail.com`
pass: `kohactive`

It will default to this email address for all sent emails.


#### AWS  

start by going to [aws.amazon](https://aws.amazon.com)

if you have an account, `sign into console` otherwise create an account

From there, go [aws IAM](https://console.aws.amazon.com/iam/home#/home)

go to the left menu and click `Groups`, and `Create New Group`

step1: give it a name

step2: you will want to give it this permission `AmazonSESFullAccess`

Next, you will need to create a user associated with the group. 
You can find this by navigating to the left menu and clicking `Users`

Follow the simple steps to create a user, at the end of this, it will generate your 
`ACCESS_ID `

as well as your 

`SECRET`

These will go into your config respectively.

Note regarding AWS. 
- you will only be able to send to verified emails while you are in sandbox mode. 

## Client 

I built a very simple ui to demonstrate the email service as well


### Setup


make sure your server is running. `yarn start` from root directory
from root directory, `cd client && yarn install && yarn start `

open a web browser and go to [localhost:9000](http://localhost:9000)

And thats it! 





