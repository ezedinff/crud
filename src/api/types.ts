import { Method } from 'axios';
export interface ApiRequestConfig {
  url: string;
  method: Method,
  data?: object;
}