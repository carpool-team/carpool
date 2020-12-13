import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {StandardButton} from '../../../components/common/buttons';
import {sheet, colors} from '../../../styles';

const RideCreated = ({navigation}) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View>
        <Text style={styles.success}>Success!</Text>
        <Text style={styles.info}>Ride has been created!</Text>
      </View>
      <StandardButton
        onPress={() => navigation.navigate('RidesStack')}
        color={colors.blue}
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
    color: colors.grayDark,
    fontSize: 16,
  },
});

export default RideCreated;
