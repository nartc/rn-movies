import { colors } from '@styles/Colors';
import React, { ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Card } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    backgroundColor: colors.default
  }
});

type MediaDetailHorizontalListProps<T> = {
  items: T[];
  imageProp: keyof T;
  children: (item: T) => ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  onPress?: (item: T) => void;
  height?: number;
  width?: number;
};

function MediaDetailHorizontalList<T>(props: MediaDetailHorizontalListProps<T>) {
  const { items, imageProp, children, onPress, height = 150, width = 100, wrapperStyle = {} } = props;

  const renderContent = (item: T, index: number) => (
    <Card
      key={ index.toString() }
      image={ { uri: item[imageProp] as unknown as string } }
      imageStyle={ { height, width } }
      containerStyle={ { ...styles.container, width } }
      wrapperStyle={ wrapperStyle }>
      { children(item) }
    </Card>
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={ false }>
      { items.map((item, i) => (
        !!onPress ? <TouchableOpacity key={ i.toString() } onPress={ () => onPress(item) }>
          { renderContent(item, i) }
        </TouchableOpacity> : renderContent(item, i)
      )) }
    </ScrollView>
  );
}

export default MediaDetailHorizontalList;
