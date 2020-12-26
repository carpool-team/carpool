import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '../../../styles';
import {Rides} from '../../../components/Driver';

const DriversRides = () => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Rides />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
});

export default DriversRides;
