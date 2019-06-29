import { Account } from '@api/Models';
import Personal from '@components/Personal/Personal';
import { accountActions } from '@store/Account/accountActions';
import { AppState } from '@store/configureStore';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState) => {
  const { account, isLoading, averageMoviesRating, averageShowsRating, watchlistCount, favoritesCount, ratedCount } = state.accountState;
  return {
    isLoading,
    account: account as Account,
    averageMoviesRating,
    averageShowsRating,
    watchlistCount,
    favoritesCount,
    ratedCount
  };
};

const mapDispatchToProps = {
  getAverageShowsRating: accountActions.getAverageShowsRating,
  getAverageMoviesRating: accountActions.getAverageMoviesRating,
  getAccountMediaCount: accountActions.getAccountMediaCount
};

export type PersonalScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Personal);
