import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';
import {Marker} from '../../common/map';
import {styles} from './index.styles';

const LocationsListItem = ({item, onPress = () => null}) => (
  <TouchableOpacity
    style={[sheet.rowCenter, styles.container]}
    onPress={onPress}>
    <Marker color={colors.green} size={20} style={styles.marker} />
    <Text style={styles.address}>{item.place_name}</Text>
  </TouchableOpacity>
);

export default LocationsListItem;
