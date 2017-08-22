import axios from 'axios';

export const SendEmail = form => axios.post('/sendEmail', form)