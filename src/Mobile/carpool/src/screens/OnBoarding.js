import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {sheet, colors} from '../styles';
import {vh} from '../utils/constants';

const OnBoarding = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('DrawerNavigator');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carpool</Text>
      <ActivityIndicator size="large" color={colors.grayVeryDark} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...sheet.textSemiBold,
    fontSize: 6 * vh,
    color: colors.blue,
    marginBottom: 10 * vh,
  },
});

export default OnBoarding;
