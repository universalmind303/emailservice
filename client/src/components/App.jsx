import React, {Component} from 'react';
import Navbar from './Navbar';
import EmailForm  from './EmailForm'

export default () => (
  <div className='container'>
    <Navbar />
    <EmailForm />
    <div>
    If you wish to continue with the interview process, It is as easy as sending an email!
    </div>

    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#sendEmail">Compose email</button>

  </div>
)


