import React, {useContext} from 'react';
import {View} from 'react-native';
import {vh, vw} from '../../utils/constants';
import sheet from '../../styles/sheet';
import UpView from '../common/UpView';
import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import {AccountContext, AccountActions} from '../../context/AccountContext';

const activeStyle = {width: 16 * vw, height: 16 * vw};
const inactiveStyle = {
  width: 12 * vw,
  height: 12 * vw,
};
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
    <View
      style={{
        position: 'absolute',
        top: 2 * vh,
        right: 5 * vw,
        zIndex: 40,
      }}>
      <View
        style={{
          ...sheet.rowCenter,
        }}>
        <UpView
          style={
            activeAccount === 'driver'
              ? {...activeStyle, marginRight: 4 * vw}
              : {...inactiveStyle, marginRight: 4 * vw}
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
          style={activeAccount === 'passenger' ? activeStyle : inactiveStyle}
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

export default AccountSwitch;
