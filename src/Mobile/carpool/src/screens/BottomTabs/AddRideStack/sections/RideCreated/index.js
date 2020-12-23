import React from 'react';
import {View, Text} from 'react-native';
import {StandardButton} from '../../../../../components/common/buttons';
import {colors} from '../../../../../styles';
import {styles} from './index.styles';

const RideCreated = ({onPress}) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.success}>Success!</Text>
      <Text style={styles.info}>Ride has been created!</Text>
    </View>
    <StandardButton onPress={onPress} color={colors.blue} title="OK" />
  </View>
);

export default RideCreated;
