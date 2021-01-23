import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Rides} from '../../../../components/Driver';
import {styles} from './index.styles';

const DriversRides = () => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Rides />
    </View>
  </SafeAreaView>
);

export default DriversRides;
