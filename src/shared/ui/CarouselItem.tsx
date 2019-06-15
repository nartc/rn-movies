import React, { FC, memo } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Platform, StyleSheet } from 'react-native';
import { colors } from '@styles/Colors';
import Spinner from 'react-native-spinkit';
import { Image, Text } from 'react-native-elements';

type CarouselItemProps = {
  backdropPath: string;
  title?: string;
  releaseDate?: string;
  name?: string;
  genres?: string;
  id: number;
  onItemTouched: (id: number) => void;
};
const CarouselItem: FC<CarouselItemProps> = memo(
  ({ backdropPath, title, releaseDate, name, genres, onItemTouched, id }) => {
    const firstText = title || name;
    const secondText = releaseDate ? `Release on: ${ releaseDate }` : `${ genres }`;

    return (
      <TouchableWithoutFeedback onPress={ () => onItemTouched(id) }>
        <View style={ styles.carouselItemWrapper }>
          <View style={ styles.carouselItem }>
            <Image
              source={ { uri: backdropPath } }
              containerStyle={ styles.flexed }
              style={ styles.carouselItemImage }
              placeholderStyle={ { backgroundColor: colors.default } }
              PlaceholderContent={
                <Spinner
                  isVisible={ true }
                  type={ Platform.OS === 'ios' ? 'Wave' : '9CubeGrid' }
                  size={ 20 }
                  color={ colors.primary }
                />
              }
            />
          </View>
          <View style={ styles.carouselBottomTextContainer }>
            <View style={ styles.carouselItemText }>
              <Text style={ styles.carouselItemTitle }>{ firstText }</Text>
            </View>
            <View style={ styles.carouselItemText }>
              <Text style={ styles.carouselItemReleaseDate }>{ secondText }</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

export default CarouselItem;

const styles = StyleSheet.create({
  flexed: {
    flex: 1
  },
  carouselItemWrapper: {
    flex: 1,
    backgroundColor: colors.default,
    height: 250,
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingTop: 10
      }
    })
  },
  carouselItem: {
    height: 250,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    alignSelf: 'stretch',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowColor: colors.secondary
  },
  carouselItemImage: {
    flex: 1,
    borderRadius: 10
  },
  carouselBottomTextContainer: {
    bottom: 0,
    left: 0,
    zIndex: 1,
    position: 'absolute'
  },
  carouselItemText: {
    backgroundColor: colors.darkWithOpacity,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 5
  },
  carouselItemTitle: {
    paddingHorizontal: 10
  },
  carouselItemReleaseDate: {
    paddingHorizontal: 10,
    fontSize: 12
  }
});
