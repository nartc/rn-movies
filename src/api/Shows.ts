import { ShowEndpointsPath, TvShow, TvShowDetail } from './Models';
import { getUrl, client } from './Axios';

export const getShows = async (path: ShowEndpointsPath, page: number = 1) => {
  const url = getUrl(`tv/${ path }`, `page=${ page }`);
  const response = await client.get<{ results: TvShow[] }>(url);
  return response.data.results;
};

export const getShowByid = async (id: number) => {
  const url = getUrl(
    `tv/${ id }`,
    'append_to_response=videos,images,credits,recommendations',
    'include_image_language=en,null'
  );
  const response = await client.get<TvShowDetail>(url);
  return response.data;
};
