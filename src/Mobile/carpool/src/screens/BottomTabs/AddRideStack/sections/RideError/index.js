import React from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../../../../styles';
import {StandardButton} from '../../../../../components/common/buttons';
import {styles} from './index.styles';

const RideError = ({onPress}) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.success}>Error!</Text>
      <Text style={styles.info}>Couldn't create a new ride</Text>
    </View>
    <StandardButton onPress={onPress} color={colors.red} title="OK" />
  </View>
);

export default RideError;
