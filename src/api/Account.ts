import { getUrl, client } from './Axios';
import { Account, WatchlistParams, FavoriteParams, AccountMediaType, AccountActionResponse } from './Models';

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
  const response = await client.get<{ total_pages: number, total_results: number, results: Array<T & { rating: number }> }>(
    url);
  return response.data;
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
