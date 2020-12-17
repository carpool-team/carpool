import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '../../../styles';
import {Rides, PastRides} from '../../../components/Driver';

const DriversRides = () => {
  const [isUpcoming, setIsUpcoming] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isUpcoming ? <Rides /> : <PastRides />}
      </View>
    </SafeAreaView>
  );
};

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
