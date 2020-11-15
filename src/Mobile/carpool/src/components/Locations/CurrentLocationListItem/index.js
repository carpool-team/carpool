import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';
import {Marker} from '../../common/map';
import {styles} from './index.styles';

const CurrentLocationListItem = ({onPress = () => null}) => (
  <TouchableOpacity
    style={[sheet.rowCenter, styles.container]}
    onPress={onPress}>
    <Marker color={colors.blue} size={20} style={styles.marker} />
    <Text style={styles.address}>Current location</Text>
  </TouchableOpacity>
);

export default CurrentLocationListItem;
