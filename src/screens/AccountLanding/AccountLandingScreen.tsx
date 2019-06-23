import AccountLanding from '@components/AccountLanding/AccountLanding';
import { accountActions } from '@store/Account/accountActions';
import { AppState } from '@store/configureStore';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState) => ({
  isLoadingSession: state.authState.isLoading,
  isLoading: state.accountState.isLoading,
  isAccountFetched: !!state.accountState.account
});

const mapDispatchToProps = {
  getAccountDetail: accountActions.getAccountDetail
};

export type AccountLandingScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(AccountLanding);
