import React from 'react';
import {UpView} from '../';
import {sheet} from '../../../styles';

const CircleButton = ({style, icon, onPress, size = 64}) => {
  return (
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
};

export default CircleButton;
