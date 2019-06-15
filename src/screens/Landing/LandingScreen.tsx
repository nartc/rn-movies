import Landing from '@components/Landing/Landing';
import { configurationActions } from '@store/Configurations/configurationActions';
import { AppState } from '@store/configureStore';
import { StackScreenProps } from '@utils/types';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppState) => ({
  hasConfiguration:
    !!state.configurationState.configuration && !!state.configurationState.configuration.images.secure_base_url,
  hasGenres: !!Object.keys(state.configurationState.movieGenres).length && !!Object.keys(state.configurationState.tvGenres).length
});

const mapDispatchToProps = {
  fetchConfiguration: configurationActions.fetchConfiguration,
  fetchGenres: configurationActions.fetchGenres
};

export type LandingScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & StackScreenProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
