import React from 'react';
import {Text, ActivityIndicator} from 'react-native';
import UpView from '../../UpView';
import {colors, sheet} from '../../../../styles';

const StandardButton = ({
  title,
  width = 240,
  height = 50,
  color = colors.blue,
  style,
  onPress,
  backgroundColor,
  disabled,
  loading,
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
      onPress={disabled || loading ? undefined : onPress}>
      {loading ? (
        <ActivityIndicator color={color} size="small" />
      ) : (
        <Text
          style={{
            color,
            fontSize: 0.33 * height,
            opacity: disabled ? 0.3 : 1,
            ...sheet.textBold,
          }}>
          {title}
        </Text>
      )}
    </UpView>
  );
};

export default StandardButton;
