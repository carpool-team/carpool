import React from 'react';
import {sheet, colors} from '../../../../styles';
import UpView from '../../UpView';
import {ActivityIndicator} from 'react-native';

const CircleButton = ({style, icon, onPress, size = 64, loading, disabled}) => (
  <UpView
    style={{
      width: size,
      height: size,
      ...style,
    }}
    contentContainerStyle={sheet.center}
    borderRadius={9999}
    onPress={loading || disabled ? undefined : onPress}>
    {loading ? <ActivityIndicator size="small" color={colors.blue} /> : icon}
  </UpView>
);

export default CircleButton;
