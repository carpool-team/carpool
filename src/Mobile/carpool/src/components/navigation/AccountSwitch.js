import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/constants';
import sheet from '../../styles/sheet';
import UpView from '../common/UpView';
import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import {AccountContext, AccountActions} from '../../context/AccountContext';

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
        <UpView
          style={
            activeAccount === 'driver'
              ? {...styles.active, marginRight: 4 * vw}
              : {...styles.inactive, marginRight: 4 * vw}
          }
          contentContainerStyle={sheet.center}
          borderRadius={9999}
          onPress={onDriverPress}>
          <Ionicon
            name="ios-car"
            color={colors.grayDark}
            size={activeAccount === 'driver' ? activeSize : inactiveSize}
          />
        </UpView>
        <UpView
          style={
            activeAccount === 'passenger' ? styles.active : styles.inactive
          }
          contentContainerStyle={sheet.center}
          borderRadius={9999}
          onPress={onPassengerPress}>
          <Ionicon
            name="md-person"
            color={colors.grayDark}
            size={activeAccount === 'passenger' ? activeSize : inactiveSize}
          />
        </UpView>
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
