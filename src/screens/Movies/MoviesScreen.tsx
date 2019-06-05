import { StackScreenProps } from '@utils/types';
import { AppState } from '@store/configureStore';
import { moviesActions } from '@store/Movies/moviesActions';
import { connect } from 'react-redux';
import Movies from '@components/Movies/Movies';

const mapStateToProps = (state: AppState) => ({
  nowPlayings: state.moviesState.nowPlayings,
  populars: state.moviesState.populars,
  upcomings: state.moviesState.upcomings,
  topRateds: state.moviesState.topRateds,
  isLoading: state.moviesState.isLoading
});

const mapDispatchToProps = {
  fetchMovies: moviesActions.fetchMovies
};

export type MoviesScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & StackScreenProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
