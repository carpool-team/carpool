import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';
import {vw} from '../../utils/constants';
import {TouchableOpacity} from 'react-native';

const CloseButton = ({style, size = 7 * vw, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon
        name="close"
        color={colors.grayDark}
        size={size}
        style={{marginRight: 3 * vw, padding: 1 * vw, ...style}}
      />
    </TouchableOpacity>
  );
};

export default CloseButton;
