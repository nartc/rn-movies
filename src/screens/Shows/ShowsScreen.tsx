import Shows from '@components/Shows/Shows';
import { AppState } from '@store/configureStore';
import { showsActions } from '@store/Shows/showsActions';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.showsState.isLoading,
  ...state.showsState
});

const mapDispatchToProps = {
  fetchShows: showsActions.fetchShows
};

export type ShowsScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Shows);
