import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {sheet, colors} from '../../styles';
import {Marker} from '../common/map';

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
    marginVertical: 5,
    paddingVertical: 9,
  },
  address: {
    ...sheet.textMedium,
    fontSize: 16,
    marginBottom: 5,
    color: colors.grayVeryDark,
    flexWrap: 'wrap',
    flex: 1,
  },
});

export default LocationsListItem;
