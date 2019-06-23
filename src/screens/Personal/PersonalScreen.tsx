import { Account } from '@api/Models';
import Personal from '@components/Personal/Personal';
import { accountActions } from '@store/Account/accountActions';
import { AppState } from '@store/configureStore';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState) => {
  const { account, isLoading, averageMoviesRating } = state.accountState;
  return { isLoading, account: account as Account, averageMoviesRating };
};

const mapDispatchToProps = {
  getAccountMovies: accountActions.getAccountMovies,
  getAccountShows: accountActions.getAccountShows,
  getAverageMoviesRating: accountActions.getAverageMoviesRating
};

export type PersonalScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
