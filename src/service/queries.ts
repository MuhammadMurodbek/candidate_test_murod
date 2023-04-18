import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4323';

export const getSchemas = () => axios.get('/schemas');
export const addSchema = (payload: any) => axios.post('/schemas', payload);
export const deleteSchema = (id: number | string) =>
  axios.delete('/schemas/' + id);
export const updateSchema = ({ id, payload }: any) =>
  axios.put('/schemas/' + id, payload);
