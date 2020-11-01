import React from 'react';
import {sheet} from '../../../../styles';
import UpView from '../../UpView';

const CircleButton = ({style, icon, onPress, size = 64}) => (
  <UpView
    style={{
      width: size,
      height: size,
      ...style,
    }}
    contentContainerStyle={sheet.center}
    borderRadius={9999}
    onPress={onPress}>
    {icon}
  </UpView>
);

export default CircleButton;
