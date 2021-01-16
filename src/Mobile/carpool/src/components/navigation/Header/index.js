import React from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AccountSwitch from '../AccountSwitch';
import {styles} from './index.styles';

const Header = props => {
  const {top} = useSafeAreaInsets();
  const {headerLeft, title} = props.scene.descriptor.options;

  return (
    <View
      style={{
        marginTop: top,
        ...styles.container,
      }}>
      <View style={styles.left}>{!!headerLeft && headerLeft()}</View>
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.right}>{!props.hideSwitch && <AccountSwitch />}</View>
    </View>
  );
};

export default Header;
