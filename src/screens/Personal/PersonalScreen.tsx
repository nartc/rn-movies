import Personal from '@components/Personal/Personal';
import { AppState } from '@store/configureStore';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState) => {
  const { account, isLoading } = state.accountState;
  return { isLoading, account };
};

export default connect()(Personal);
