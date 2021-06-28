import Axios from 'axios';

const baseURL = 'http://127.0.0.1:3333';
const axios = Axios.create({
  baseURL,

});

export default axios;
