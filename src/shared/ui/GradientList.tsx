import { Movie, TvShow } from '@api/Models';
import { colors } from '@styles/Colors';
import CenterView from '@ui/CenterView';
import GradientListItem from '@ui/GradientListItem';
import React, { FC } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-spinkit';

type GradientListProps = {
  isLoading: boolean;
  onItemPress: (id: number) => void;
  data: Movie[] | TvShow[];
  currentPage: number;
  onEndReached: () => void;
};

const styles = StyleSheet.create({
  gradientContainer: {
    backgroundColor: colors.default,
    marginHorizontal: 10,
    marginVertical: 5,
    flex: 1,
    padding: 10,
    borderRadius: 10
  },
  gradientTitle: {
    fontSize: 14
  },
  gradientSubTitle: {
    fontWeight: 'bold',
    color: colors.light,
    fontSize: 10
  },
});

const GradientList: FC<GradientListProps> = ({ onItemPress, isLoading, data, currentPage, onEndReached }) => {
  const renderItem = (item: { item: Movie | TvShow, index: number }) => {
    const title = (item.item as Movie).title || (item.item as TvShow).name;
    const subtitle = (item.item.genre_names as string[]).join(', ');

    return (
      <GradientListItem leftAvatar={ {
        ImageComponent: FastImage as any,
        source: { uri: item.item.poster_path },
        icon: { name: 'image' }
      } }
                        linearGradientProps={ {
                          colors: ['#232526', '#414345'],
                          start: { x: 1, y: 0 },
                          end: { x: 0, y: 0.2 },
                        } }
                        containerStyle={ styles.gradientContainer }
                        title={ title }
                        titleStyle={ styles.gradientTitle }
                        subtitle={ subtitle }
                        subtitleStyle={ styles.gradientSubTitle }
                        onPress={ () => onItemPress(item.item.id) }/>
    );
  };

  const renderFooter = () => (
    <CenterView>
      <Spinner isVisible={ isLoading } type={ 'Bounce' } size={ 18 } color={ colors.primary }/>
    </CenterView>
  );

  return (
    <FlatList data={ data as any }
              extraData={ currentPage }
              ListFooterComponent={ renderFooter }
              ListEmptyComponent={ <CenterView><Text>No items</Text></CenterView> }
              renderItem={ renderItem }
              keyExtractor={ item => item.id.toString() }
              showsHorizontalScrollIndicator={ false }
              scrollEventThrottle={ 16 }
              onEndReached={ onEndReached }
              onEndReachedThreshold={ 0.2 }/>
  );
};

export default GradientList;
