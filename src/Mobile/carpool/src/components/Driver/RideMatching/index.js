import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './index.styles';

const RideMatching = ({matching}) => {
  if (matching < 15) {
    return <Text style={styles.perfect}>Perfect matching!</Text>;
  }

  if (matching < 40) {
    return <Text style={styles.great}>Great matching</Text>;
  }

  if (matching <= 65) {
    return <Text style={styles.good}>Good matching</Text>;
  }

  if (matching < 100) {
    return <Text style={styles.mediocre}>Mediocre matching</Text>;
  }

  if (matching < 150) {
    return <Text style={styles.bad}>Bad matching</Text>;
  }

  return <Text style={styles.terrible}>Terrible matching</Text>;
};

export default RideMatching;
