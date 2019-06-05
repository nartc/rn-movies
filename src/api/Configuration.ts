import { getUrl, client } from './Axios';
import { Configuration } from './Models';

export const getConfiguration = async () => {
  const url = getUrl('configuration');
  const response = await client.get<Configuration>(url);
  return response.data;
};
