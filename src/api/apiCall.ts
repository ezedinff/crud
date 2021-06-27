import axios from 'axios';
import { ApiRequestConfig } from './types';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`
});

export default async function(config: ApiRequestConfig) {
  return await api({...config});
}
