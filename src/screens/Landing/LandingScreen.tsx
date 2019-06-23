import Landing from '@components/Landing/Landing';
import { authActions } from '@store/Auth/authActions';
import { configurationActions } from '@store/Configurations/configurationActions';
import { AppState } from '@store/configureStore';
import { StackScreenProps } from '@utils/types';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState) => ({
  hasConfiguration:
    !!state.configurationState.configuration && !!state.configurationState.configuration.images.secure_base_url,
  hasGenres: !!Object.keys(state.configurationState.movieGenres).length &&
    !!Object.keys(state.configurationState.tvGenres).length,
  token: state.authState.token,
  isLoading: state.authState.isLoading,
  isTokenApproved: state.authState.isApproved
});

const mapDispatchToProps = {
  fetchConfiguration: configurationActions.fetchConfiguration,
  fetchGenres: configurationActions.fetchGenres,
  requestToken: authActions.requestToken,
  createSession: authActions.createSession
};

export type LandingScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
