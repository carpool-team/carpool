import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';
import {StandardButton} from '../../../components/common/buttons';

const RideError = ({navigation}) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View>
        <Text style={styles.success}>Error!</Text>
        <Text style={styles.info}>Couldn't create a new ride</Text>
      </View>
      <StandardButton
        onPress={() => navigation.navigate('RidesStack')}
        color={colors.red}
        title="OK"
      />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  success: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 40,
  },
  info: {
    ...sheet.textMedium,
    color: colors.red,
    fontSize: 16,
  },
});

export default RideError;
