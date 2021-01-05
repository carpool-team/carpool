import React from 'react';
import {View, Text} from 'react-native';
import UpView from '../../../common/UpView';
import {sheet} from '../../../../styles';
import {styles} from './index.styles';

const PickWeeks = ({weeks, onSubtractWeeks, onAddWeeks}) => (
  <View style={styles.container}>
    <UpView
      style={styles.circle}
      contentContainerStyle={sheet.center}
      onPress={onSubtractWeeks}
      borderRadius={99999}>
      <Text style={styles.indicator}>-</Text>
    </UpView>
    <Text style={styles.count}>{weeks}</Text>
    <UpView
      style={styles.circle}
      contentContainerStyle={sheet.center}
      onPress={onAddWeeks}
      borderRadius={99999}>
      <Text style={styles.indicator}>+</Text>
    </UpView>
  </View>
);

export default PickWeeks;
