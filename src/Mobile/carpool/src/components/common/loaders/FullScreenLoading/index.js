import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {colors} from '../../../../styles';
import {styles} from './index.styles';

const FullScreenLoading = () => (
  <View style={styles.container}>
    <ActivityIndicator color={colors.blue} size="large" />
  </View>
);

export default FullScreenLoading;
