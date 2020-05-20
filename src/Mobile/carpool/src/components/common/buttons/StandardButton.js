import React from 'react';
import {Text} from 'react-native';
import {UpView} from '../';
import {colors, sheet} from '../../../styles';
import {vw, vh} from '../../../utils/constants';

const StandardButton = ({
  title,
  width = 65 * vw,
  height = 6 * vh,
  color = colors.blue,
  style,
  onPress,
}) => {
  return (
    <UpView
      style={{width, height, ...style}}
      borderRadius={100}
      contentContainerStyle={sheet.center}
      onPress={onPress}>
      <Text style={{color, fontSize: 0.375 * height, ...sheet.textBold}}>
        {title}
      </Text>
    </UpView>
  );
};

export default StandardButton;
