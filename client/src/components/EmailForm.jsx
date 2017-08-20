import React, { Component } from 'react';
import { SendEmail }  from './Service.jsx';


class EmailForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        toEmail: 'cory.grinstead@gmail.com',
        fromEmail: '',
        subject: '',
        body: '',
        attachments: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateForm = this.updateForm.bind(this)
  }

  updateForm(e, type) {
    e.preventDefault()
    this.setState({ [type] : e.target.value })
  }
  async handleSubmit() {

    let {toEmail, fromEmail, subject, body, attachments} = this.state

    try {
      await SendEmail({
        toEmail: toEmail.split ? toEmail.split(',') : toEmail,
        fromEmail: fromEmail,
        subject: subject,
        body: body,
        attachments: attachments
      })
    } catch (e) {
      console.error(e)
    }
    
  }
  render() {

    return (
    // <!-- Modal -->
      <div className='modal fade' id='sendEmail' tabIndex='-1' role='dialog' aria-labelledby='sendEmailLabel' aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='sendEmailLabel'>Compose Email</h5>

            </div>
            <div className='modal-body'>
            <form onSubmit={this.submitForm}>
              <div className='form-group'>
                <label>To:</label>
                <input 
                type='email'
                multiple
                value={this.state.toEmail}
                onChange={(e) => this.updateForm(e, 'toEmail')}
                className='form-control'></input>
              </div> 
              <div className='form-group'>
                <label>From:</label>
                <input 
                type='email' 
                onChange={(e) => this.updateForm(e, 'fromEmail')}
                className='form-control'></input>
              </div> 
              <div className='form-group'>
                <label>Subject:</label>
                <input 
                onChange={(e) => this.updateForm(e, 'subject')}
                className='form-control'></input>
              </div> 
                <div className='form-group'>
                <label>Body:</label>
                <textarea 
                className='form-control' 
                onChange ={(e) => this.updateForm(e, 'body')}
                rows='4'></textarea>
              </div>      
            </form>


            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'>Cancel</button>
              <button onClick ={() => this.handleSubmit()} data-dismiss='modal' className='btn btn-primary'>Send</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EmailForm