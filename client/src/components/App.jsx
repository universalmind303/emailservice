import React, {Component} from 'react';
import Navbar from './Navbar';
import EmailForm  from './EmailForm'

export default () => (
  <div className='container'>
    <Navbar />
    <EmailForm />
    <div>
    If you like what you see, I would love to hear what you think. 
    </div>

    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#sendEmail">Compose email</button>

  </div>
)


