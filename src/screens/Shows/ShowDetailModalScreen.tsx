import { TvShowDetail } from '@api/Models';
import ShowDetail from '@components/Shows/ShowDetail';
import { AppState } from '@store/configureStore';
import { showsActions } from '@store/Shows/showsActions';
import { StackScreenProps } from '@utils/types';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState, ownProps: StackScreenProps<{ id: number }>) => {
  const { isLoading, selectedShow } = state.showsState;
  return {
    show: selectedShow as TvShowDetail,
    isLoading,
    id: ownProps.navigation.getParam('id', 0)
  };
};

const mapDispatchToProps = {
  fetchShowById: showsActions.fetchShow,
  fetchShowAccountStates: showsActions.fetchShowAccountStates
};

export type ShowDetailModalScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ShowDetail);
