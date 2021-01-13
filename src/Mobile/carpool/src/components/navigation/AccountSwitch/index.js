import React from 'react';
import {View} from 'react-native';
import {sheet, colors} from '../../../styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {CircleButton} from '../../common/buttons';
import {styles} from './index.styles';
import {useActiveAccount} from '../../../hooks';
import {useNavigation} from '@react-navigation/native';

const activeSize = 28;
const inactiveSize = 20;
const activeCircle = 45;
const inactiveCircle = 32;
// const activeSize = 36;
// const inactiveSize = 28;
// const activeCircle = 64;
// const inactiveCircle = 48;

const AccountSwitch = ({style}) => {
  const navigation = useNavigation();
  const {activeAccount, toggleActiveAccount} = useActiveAccount();

  const onDriverPress = () => {
    if (activeAccount === 'driver') {
      return;
    } else {
      toggleActiveAccount();
      navigation.navigate('Home');
    }
  };

  const onPassengerPress = () => {
    if (activeAccount === 'passenger') {
      return;
    } else {
      toggleActiveAccount();
      navigation.navigate('Home');
    }
  };

  return (
    <View style={{...sheet.rowCenter, ...style}}>
      <CircleButton
        style={styles.circleButton}
        size={activeAccount === 'driver' ? activeCircle : inactiveCircle}
        onPress={onDriverPress}
        icon={
          <Ionicon
            name="ios-car"
            color={colors.grayDark}
            size={activeAccount === 'driver' ? activeSize : inactiveSize}
          />
        }
      />
      <CircleButton
        size={activeAccount === 'passenger' ? activeCircle : inactiveCircle}
        onPress={onPassengerPress}
        icon={
          <Ionicon
            name="md-person"
            color={colors.grayDark}
            size={activeAccount === 'passenger' ? activeSize : inactiveSize}
          />
        }
      />
    </View>
  );
};

export default AccountSwitch;
