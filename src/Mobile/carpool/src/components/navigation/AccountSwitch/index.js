import React from 'react';
import {View} from 'react-native';
import {sheet, colors} from '../../../styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {CircleButton} from '../../common/buttons';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../../store/actions';
import {styles} from './index.styles';

const activeSize = 40;
const inactiveSize = 28;

const AccountSwitch = () => {
  const rdispatch = useDispatch();
  const activeAccount = useSelector(
    state => state.accountReducer.activeAccount,
  );

  const onDriverPress = () => {
    if (activeAccount === 'driver') {
      return;
    } else {
      rdispatch(actions.toggleActiveAccount());
    }
  };

  const onPassengerPress = () => {
    if (activeAccount === 'passenger') {
      return;
    } else {
      rdispatch(actions.toggleActiveAccount());
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default AccountSwitch;
