import Axios, { AxiosInstance } from 'axios';

const apiKey = 'api_key=26766539c19cd8519cf023f43ff7064d';
const langQueryParam = 'language=en-US';

export const client: AxiosInstance = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 10000
});

export const getUrl = (endpoint: string, ...extraParams: string[]): string => {
  const extra = !!extraParams.length ? extraParams.join('&') : '';
  return `${ endpoint }?${ apiKey }&${ langQueryParam }&${ extra }`;
};
