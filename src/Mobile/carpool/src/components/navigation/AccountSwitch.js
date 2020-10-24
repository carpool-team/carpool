import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {vh} from '../../utils/constants';
import {sheet, colors} from '../../styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {AccountContext, AccountActions} from '../../context/AccountContext';
import {CircleButton} from '../common/buttons';

const activeSize = 40;
const inactiveSize = 28;

const AccountSwitch = () => {
  const {accountState, dispatch} = useContext(AccountContext);
  const {activeAccount} = accountState;

  const onDriverPress = () => {
    if (activeAccount === 'driver') {
      return;
    } else {
      dispatch({type: AccountActions.TOGGLE_ACTIVE_ACCOUNT});
    }
  };

  const onPassengerPress = () => {
    if (activeAccount === 'passenger') {
      return;
    } else {
      dispatch({type: AccountActions.TOGGLE_ACTIVE_ACCOUNT});
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          ...sheet.rowCenter,
        }}>
        <CircleButton
          style={{marginRight: 16}}
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 2 * vh,
    right: 20,
    zIndex: 40,
  },
  active: {
    width: 64,
    height: 64,
  },
  inactive: {
    width: 48,
    height: 48,
  },
});

export default AccountSwitch;
