import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colors, sheet} from '../../../styles';
import {styles} from './index.styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const CurrentLocationListItem = ({onPress = () => null}) => (
  <TouchableOpacity
    style={[sheet.rowCenter, styles.container]}
    onPress={onPress}>
    <Icon
      name="map-marker"
      color={colors.blue}
      size={32}
      style={styles.marker}
    />
    <Text style={styles.address}>Current location</Text>
  </TouchableOpacity>
);

export default CurrentLocationListItem;
