import React, { FC, memo } from 'react';
import { ListItem, ListItemProps } from 'react-native-elements';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

type GradientListItemProps = ListItemProps & {
  linearGradientProps: LinearGradientProps;
};

const GradientListItem: FC<GradientListItemProps> = memo(props => (
  <ListItem { ...props } ViewComponent={ LinearGradient as any }/>
));

export default GradientListItem;
