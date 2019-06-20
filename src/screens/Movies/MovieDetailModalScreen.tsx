import MovieDetail from '@components/Movies/MovieDetail';
import { connect } from 'react-redux';
import { AppState } from '@store/configureStore';
import { StackScreenProps } from '@utils/types';
import { MovieDetail as MovieDetailModel } from '@api/Models';
import { moviesActions } from '@store/Movies/moviesActions';

const mapStateToProps = (state: AppState, ownProps: StackScreenProps<{ id: number }>) => ({
  movie: state.moviesState.selectedMovie as MovieDetailModel,
  isLoading: state.moviesState.isLoading,
  id: ownProps.navigation.getParam('id', 0)
});

const mapDispatchToProps = {
  fetchMovieById: moviesActions.fetchMovie
};

export type MovieDetailModalScreenProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
