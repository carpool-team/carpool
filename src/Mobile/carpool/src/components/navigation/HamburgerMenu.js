import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles';
import {vh} from '../../utils/constants';
import {useNavigation} from '@react-navigation/core';

const HamburgerMenu = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 2 * vh,
        left: 20,
        zIndex: 40,
      }}
      onPress={() => navigation.toggleDrawer()}>
      <Icon name="ios-menu" color={colors.grayDark} size={44} />
    </TouchableOpacity>
  );
};

export default HamburgerMenu;
