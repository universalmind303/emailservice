import axios from 'axios';

export const SendEmail = form => {
  console.log(form)
  return axios.post('/sendEmail', form)
};