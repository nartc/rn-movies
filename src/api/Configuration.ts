import { getUrl, client } from './Axios';
import { Configuration, Genre } from './Models';

export const getConfiguration = async () => {
  const url = getUrl('configuration');
  const response = await client.get<Configuration>(url);
  return response.data;
};

export const getGenres = async (type: 'movie' | 'tv') => {
  const url = getUrl(`genre/${ type }/list`);
  const response = await client.get<{ genres: Genre[] }>(url);
  return response.data.genres;
};
