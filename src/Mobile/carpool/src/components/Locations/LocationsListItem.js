import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {sheet, colors} from '../../styles';
import {vh} from '../../utils/constants';
import {Marker} from '../common';

const LocationsListItem = ({item, onPress = () => null}) => {
  return (
    <TouchableOpacity
      style={[sheet.rowCenter, styles.container]}
      onPress={onPress}>
      <Marker color={colors.green} size={20} style={{marginRight: 12}} />
      <Text style={styles.address}>{item.place_name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 0.5 * vh,
    paddingVertical: 1 * vh,
  },
  address: {
    ...sheet.textMedium,
    fontSize: 16,
    marginBottom: 0.5 * vh,
    color: colors.grayVeryDark,
    flexWrap: 'wrap',
    flex: 1,
  },
});

export default LocationsListItem;
