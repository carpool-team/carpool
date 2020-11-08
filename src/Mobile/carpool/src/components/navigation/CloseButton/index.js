import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors';
import {TouchableOpacity} from 'react-native';

const CloseButton = ({style, size = 28, navigation}) => (
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Icon
      name="close"
      color={colors.grayDark}
      size={size}
      style={{marginRight: 12, padding: 4, ...style}}
    />
  </TouchableOpacity>
);

export default CloseButton;
