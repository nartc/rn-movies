import PersonalList from '@components/Personal/PersonalList';
import { accountActions } from '@store/Account/accountActions';
import { AppState } from '@store/configureStore';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.accountState.isLoading,
  favoriteMovies: state.accountState.favoriteMovies,
  favoriteShows: state.accountState.favoriteShows,
  ratedMovies: state.accountState.ratedMovies,
  ratedShows: state.accountState.ratedShows,
  watchlistMovies: state.accountState.watchlistMovies,
  watchlistShows: state.accountState.watchlistShows
});

const mapDispatchToProps = {
  getAccountMovies: accountActions.getAccountMovies,
  getAccountShows: accountActions.getAccountShows
};

export type PersonalListScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PersonalList);
