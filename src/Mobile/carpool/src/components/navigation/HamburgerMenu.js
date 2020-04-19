import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import {vh, vw} from '../../utils/constants';
import {useNavigation} from '@react-navigation/core';

const HamburgerMenu = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 2 * vh,
        left: 5 * vw,
        zIndex: 40,
      }}
      onPress={() => navigation.toggleDrawer()}>
      <Icon name="ios-menu" color={colors.grayDark} size={11 * vw} />
    </TouchableOpacity>
  );
};

export default HamburgerMenu;
