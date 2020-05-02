import React, {useState} from 'react';
import {View} from 'react-native';
import {vh, vw} from '../../utils/constants';
import sheet from '../../styles/sheet';
import UpView from '../common/UpView';
import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';

const activeStyle = {width: 16 * vw, height: 16 * vw};
const inactiveStyle = {
  width: 12 * vw,
  height: 12 * vw,
};
const activeSize = 10 * vw;
const inactiveSize = 7 * vw;

const AccountSwitch = () => {
  const [active, setActive] = useState('passenger');

  const onDriverPress = () => {
    if (active === 'driver') {
      return;
    } else {
      setActive('driver');
    }
  };

  const onPassengerPress = () => {
    if (active === 'passenger') {
      return;
    } else {
      setActive('passenger');
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
            active === 'driver'
              ? {...activeStyle, marginRight: 4 * vw}
              : {...inactiveStyle, marginRight: 4 * vw}
          }
          contentContainerStyle={sheet.center}
          borderRadius={9999}
          onPress={onDriverPress}>
          <Ionicon
            name="ios-car"
            color={colors.grayDark}
            size={active === 'driver' ? activeSize : inactiveSize}
          />
        </UpView>
        <UpView
          style={active === 'passenger' ? activeStyle : inactiveStyle}
          contentContainerStyle={sheet.center}
          borderRadius={9999}
          onPress={onPassengerPress}>
          <Ionicon
            name="md-person"
            color={colors.grayDark}
            size={active === 'passenger' ? activeSize : inactiveSize}
          />
        </UpView>
      </View>
    </View>
  );
};

export default AccountSwitch;
