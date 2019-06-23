import { getUrl, client } from './Axios';
import { Account, WatchlistParams, FavoriteParams, AccountMediaType } from './Models';

type AccountActionResponse = { status_code: number; status_message: string };

const getSessionIdParams = (sessionId: string) => `session_id=${ sessionId }`;

export const getAccountDetail = async (sessionId: string) => {
  const url = getUrl('account', getSessionIdParams(sessionId));
  const response = await client.get<Account>(url);
  return response.data;
};

// TODO: Strongly type
export const getCreatedList = async (accountId: number, sessionId: string, page: number = 1) => {
  const url = getUrl(`account/${ accountId }/lists`, getSessionIdParams(sessionId), `page=${ page }`);
  const response = await client.get(url);
  return response.data;
};

export const getAccountMedias = async <T>(
  accountId: number,
  sessionId: string,
  mediaType: 'movies' | 'tv',
  type: AccountMediaType,
  page: number = 1
) => {
  const url = getUrl(`account/${ accountId }/${ type }/${ mediaType }`,
    getSessionIdParams(sessionId),
    `page=${ page }`);
  const response = await client.get<{ results: T[] }>(url);
  return response.data.results;
};

export const addToWatchList = async (accountId: number, sessionId: string, params: WatchlistParams) => {
  const url = getUrl(`account/${ accountId }/watchlist`, getSessionIdParams(sessionId));
  const response = await client.post<AccountActionResponse>(url, params);
  return response.data;
};

export const markFavorite = async (accountId: number, sessionId: string, params: FavoriteParams) => {
  const url = getUrl(`account/${ accountId }/favorite`, getSessionIdParams(sessionId));
  const response = await client.post<AccountActionResponse>(url, params);
  return response.data;
};
