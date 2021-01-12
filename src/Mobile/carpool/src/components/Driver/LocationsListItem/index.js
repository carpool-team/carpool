import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {sheet, colors} from '../../../styles';
import {styles} from './index.styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const LocationsListItem = ({item, onPress = () => null}) => (
  <TouchableOpacity
    style={[sheet.rowCenter, styles.container]}
    onPress={onPress}>
    <Icon
      name="map-marker"
      color={colors.green}
      size={28}
      style={styles.marker}
    />
    <Text style={styles.address}>{item.place_name}</Text>
  </TouchableOpacity>
);

export default LocationsListItem;
