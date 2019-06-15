import { Movie, MovieEndpointsPath } from '@api/Models';
import FilterMovies from '@components/Movies/FilterMovies';
import { AppState } from '@store/configureStore';
import { moviesActions } from '@store/Movies/moviesActions';
import { StackScreenProps } from '@utils/types';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState, ownProps: StackScreenProps<{ movieType: MovieEndpointsPath }>) => {
  const { navigation } = ownProps;
  const movieType = navigation.getParam('movieType', 'popular');
  const movies = state.moviesState.filtered[movieType] || state.moviesState.searchMovies[movieType];
  return {
    isLoading: state.moviesState.isLoading,
    movieType,
    movies
  };
};

const mapDispatchToProps = {
  fetchMoviesByPage: moviesActions.fetchMoviesByPage,
  filterMovies: moviesActions.filterMovies
};

export type FilterhMoviesScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FilterMovies);
