import { MovieEndpointsPath, Movie, MovieDetail } from './Models';
import { getUrl, client } from './Axios';

export const getMovies = async (path: MovieEndpointsPath, page: number = 1) => {
  const url = getUrl(`movie/${path}`, `page=${page}`);
  const response = await client.get<{ results: Movie[] }>(url);
  return response.data.results;
};

export const getMovieById = async (id: number) => {
  const url = getUrl(
    `movie/${id}`,
    'append_to_response=videos,images,credits,recommendations',
    'include_image_language=en,null'
  );
  const response = await client.get<MovieDetail>(url);
  return response.data;
};
