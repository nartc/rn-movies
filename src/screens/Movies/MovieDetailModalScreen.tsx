import MovieDetail from '@components/Movies/MovieDetail';
import { accountActions } from '@store/Account/accountActions';
import { connect } from 'react-redux';
import { AppState } from '@store/configureStore';
import { StackScreenProps } from '@utils/types';
import { AccountState, MovieDetail as MovieDetailModel } from '@api/Models';
import { moviesActions } from '@store/Movies/moviesActions';

const mapStateToProps = (state: AppState, ownProps: StackScreenProps<{ id: number }>) => ({
  movie: state.moviesState.selectedMovie as MovieDetailModel,
  accountState: state.moviesState.selectedMovieAccountState as AccountState,
  isLoading: state.moviesState.isLoading,
  id: ownProps.navigation.getParam('id', 0)
});

const mapDispatchToProps = {
  fetchMovieById: moviesActions.fetchMovie,
  fetchMovieAccountStates: moviesActions.fetchMovieAccountStates,
  toggleFavorite: accountActions.toggleFavorite,
  toggleWatchlist: accountActions.toggleWatchlist,
  rateMovie: moviesActions.rateMovie
};

export type MovieDetailModalScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
