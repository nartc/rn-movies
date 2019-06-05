import { ViewProps, View } from 'react-native';
import React, { FC } from 'react';

type Props = ViewProps;
const CenterView: FC<Props> = ({ style, children, ...props }) => {
  return (
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, style]} {...props}>
      {children}
    </View>
  );
};

export default CenterView;
