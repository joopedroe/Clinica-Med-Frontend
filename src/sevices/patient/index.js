import axios from '../../axios/index';

export default {
  get_patient: (cpf) => axios.get(`/patient/cpf/${cpf}`),
  new_patient: (data) => axios.post('/patient/', data),
};
