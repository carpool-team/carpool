import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/constants';
import {sheet, colors} from '../../styles';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {AccountContext, AccountActions} from '../../context/AccountContext';
import {CircleButton} from '../common/buttons';

const activeSize = 10 * vw;
const inactiveSize = 7 * vw;

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
          style={{marginRight: 4 * vw}}
          size={activeAccount === 'driver' ? 16 * vw : 12 * vw}
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
          size={activeAccount === 'passenger' ? 16 * vw : 12 * vw}
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
    right: 5 * vw,
    zIndex: 40,
  },
  active: {
    width: 16 * vw,
    height: 16 * vw,
  },
  inactive: {
    width: 12 * vw,
    height: 12 * vw,
  },
});

export default AccountSwitch;
