export type MovieEndpointsPath = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
export type ShowEndpointsPath =
  | Exclude<MovieEndpointsPath, 'now_playing' | 'upcoming'>
  | 'on_the_air'
  | 'airing_today';
export type AccountMediaType = 'favorite' | 'watchlist' | 'rated';

export enum VideoType {
  Trailer = 'Trailer',
  Clip = 'Clip',
  BHS = 'Behind the Scenes',
  Teaser = 'Teaser'
}

export enum VideoSite {
  Youtube = 'YouTube'
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface Videos {
  results: Video[];
}

export interface Image {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface Images {
  backdrops: Image[];
  posters: Image[];
}

export interface Cast {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path: string;
}

export interface Crew {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface AccountState {
  id: number;
  rated: boolean | { value: number };
  watchlist: boolean;
  favorite: boolean;
}

export interface Movie {
  adult: false;
  backdrop_path: string;
  genre_ids: number[];
  genre_names?: string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export enum MovieStatus {
  Rumored = 'Rumored',
  Planned = 'Planned',
  InProduction = 'In Production',
  PostProduction = 'Post Production',
  Released = 'Released',
  Canceled = 'Canceled'
}

export interface MovieDetail extends Movie {
  belongs_to_collection?: BelongsToCollection;
  budget: number;
  genres: Genre[];
  imdb_id: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: MovieStatus;
  tagline: string;
  videos: Videos;
  images: Images;
  credits: Credits;
  recommendations: Recommendations<Movie>;
}

export interface TvShow {
  original_name: string;
  genre_ids: number[];
  genre_names?: string[];
  name: string;
  popularity: number;
  origin_country: string[];
  vote_count: number;
  first_air_date: string;
  backdrop_path: string;
  original_language: string;
  id: number;
  vote_average: number;
  overview: string;
  poster_path: string;
}

export interface TvShowDetail extends TvShow {
  created_by: any[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  next_episode_to_air: NextEpisodeToAir;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  seasons: Season[];
  status: string;
  type: string;
  images: Images;
  recommendations: Recommendations<TvShow>;
  videos: Videos;
  credits: Credits;
}

export interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface NextEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface Logo {
  path: string;
  aspect_ratio: number;
}

export interface Recommendations<T> {
  results: T[];
}

export type BackdropSizes = 'w300' | 'w780' | 'w1280' | 'original';
export type LogoSizes = 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original';
export type PosterSizes = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
export type ProfileSizes = 'w45' | 'w185' | 'h632' | 'original';
export type StillSizes = 'w92' | 'w185' | 'w300' | 'original';

export interface ImageConfiguration {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: BackdropSizes[];
  logo_sizes: LogoSizes[];
  poster_sizes: PosterSizes[];
  profile_sizes: ProfileSizes[];
  still_sizes: StillSizes[];
}

export interface Configuration {
  images: ImageConfiguration;
  change_keys: string[];
}

export interface RequestToken {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface Session {
  success: boolean;
  session_id: string;
}

export interface Gravatar {
  hash: string;
}

export interface Avatar {
  gravatar: Gravatar;
}

export interface Account {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
  avatar_url: string;
}

export class WatchlistParams {
  media_type: 'movie' | 'tv';
  media_id: number;
  watchlist: boolean;

  constructor(media_type: 'movie' | 'tv', media_id: number) {
    this.media_id = media_id;
    this.media_type = media_type;
    this.watchlist = true;
  }
}

export class FavoriteParams {
  media_type: 'movie' | 'tv';
  media_id: number;
  favorite: boolean;

  constructor(media_type: 'movie' | 'tv', media_id: number, favorite: boolean) {
    this.media_id = media_id;
    this.media_type = media_type;
    this.favorite = favorite;
  }
}
