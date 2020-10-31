import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors, sheet} from '../../styles';
import {Marker} from '../common';

const CurrentLocationListItem = ({onPress = () => null}) => {
  return (
    <TouchableOpacity
      style={[sheet.rowCenter, styles.container]}
      onPress={onPress}>
      <Marker color={colors.blue} size={20} style={{marginRight: 12}} />
      <Text style={styles.address}>Current location</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingVertical: 9,
  },
  address: {
    ...sheet.textSemiBold,
    fontSize: 16,
    marginBottom: 5,
    color: colors.grayVeryDark,
    flexWrap: 'wrap',
    flex: 1,
  },
});

export default CurrentLocationListItem;
