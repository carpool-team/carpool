import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {sheet, colors} from '../styles';

const OnBoarding = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Carpool</Text>
    <ActivityIndicator size="large" color={colors.grayVeryDark} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...sheet.textSemiBold,
    fontSize: 54,
    color: colors.blue,
    marginBottom: 90,
  },
});

export default OnBoarding;
