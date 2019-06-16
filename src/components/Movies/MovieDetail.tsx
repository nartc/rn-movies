import CenterView from '@ui/CenterView';
import {StackScreenComponent} from '@utils/types';
import React, {useEffect} from 'react';
import {Text} from 'react-native-elements';
import {MovieDetailModalScreenProps} from "@screens/Movies/MovieDetailModalScreen";

const MovieDetail: StackScreenComponent<MovieDetailModalScreenProps> = ({movie, id, fetchMovieById}) => {

    useEffect(() => {
        fetchMovieById(id);
    }, []);

    return (
        <CenterView>
            <Text>Movie detail modal: {id}</Text>
        </CenterView>
    );
};

export default MovieDetail;
