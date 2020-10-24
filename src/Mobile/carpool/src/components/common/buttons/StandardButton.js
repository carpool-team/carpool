import React from 'react';
import {Text} from 'react-native';
import {UpView} from '../';
import {colors, sheet} from '../../../styles';
import {vh} from '../../../utils/constants';

const StandardButton = ({
  title,
  width = 270,
  height = 6 * vh,
  color = colors.blue,
  style,
  onPress,
  backgroundColor,
}) => {
  let contentContainerStyle = {...sheet.center};

  if (backgroundColor) {
    contentContainerStyle.backgroundColor = backgroundColor;
  }

  return (
    <UpView
      style={{width, height, ...style}}
      borderRadius={100}
      contentContainerStyle={contentContainerStyle}
      onPress={onPress}>
      <Text style={{color, fontSize: 0.375 * height, ...sheet.textBold}}>
        {title}
      </Text>
    </UpView>
  );
};

export default StandardButton;
