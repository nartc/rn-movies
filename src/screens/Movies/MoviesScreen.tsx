import Movies from '@components/Movies/Movies';
import { AppState } from '@store/configureStore';
import { moviesActions } from '@store/Movies/moviesActions';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState) => {
  const { populars, topRateds, isLoading, upcomings, nowPlayings } = state.moviesState;
  return { nowPlayings, populars, upcomings, topRateds, isLoading };
};

const mapDispatchToProps = {
  fetchMovies: moviesActions.fetchMovies,
};

export type MoviesScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
