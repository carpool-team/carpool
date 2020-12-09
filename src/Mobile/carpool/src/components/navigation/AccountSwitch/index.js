import React from 'react';
import {View} from 'react-native';
import {sheet, colors} from '../../../styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {CircleButton} from '../../common/buttons';
import {styles} from './index.styles';
import {useActiveAccount} from '../../../hooks';

const activeSize = 36;
const inactiveSize = 28;

const AccountSwitch = () => {
  const {activeAccount, toggleActiveAccount} = useActiveAccount();

  const onDriverPress = () => {
    if (activeAccount === 'driver') {
      return;
    } else {
      toggleActiveAccount();
    }
  };

  const onPassengerPress = () => {
    if (activeAccount === 'passenger') {
      return;
    } else {
      toggleActiveAccount();
    }
  };

  return (
    <View style={sheet.rowCenter}>
      <CircleButton
        style={styles.circleButton}
        size={activeAccount === 'driver' ? 64 : 48}
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
        size={activeAccount === 'passenger' ? 64 : 48}
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
