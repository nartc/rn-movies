import { getUrl, client } from './Axios';
import { RequestToken, Session } from './Models';

export const createRequestToken = async () => {
  const url = getUrl('authentication/token/new');
  const response = await client.get<RequestToken>(url);
  return response.data;
};

export const createSessionId = async (requestToken: string) => {
  const url = getUrl('authentication/session/new');
  const response = await client.post<Session>(url, { request_token: requestToken });
  return response.data;
};
