import React, {useState} from 'react';
import {View, Text, SafeAreaView, Switch, StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';
import {vw, vh} from '../../../utils/constants';
import DatePicker from 'react-native-date-picker';
import PickDays from '../../../components/Driver/AddRide/PickDays';
import {StandardButton} from '../../../components/common/buttons';

const PickTime = ({navigation}) => {
  const [isRegular, setIsRegular] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const renderSingular = () => (
    <View style={styles.singularContainer}>
      <DatePicker
        date={date}
        onDateChange={setDate}
        locale="pl"
        minimumDate={new Date()}
        minuteInterval={10}
      />
    </View>
  );

  const renderRegular = () => (
    <View style={styles.regularContainer}>
      <DatePicker
        date={time}
        onDateChange={setTime}
        locale="pl"
        minuteInterval={10}
        mode="time"
      />
      <PickDays />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.switchRow}>
          <Text style={styles.regularRide}>Regular ride</Text>
          <Switch value={isRegular} onValueChange={setIsRegular} />
        </View>
        {isRegular ? renderRegular() : renderSingular()}
        <StandardButton
          style={{}}
          width="65%"
          onPress={() => navigation.navigate('SetSeats')}
          title="Next"
          color={colors.blue}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  singularContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  regularContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 6 * vw,
    paddingTop: 4 * vh,
    paddingBottom: 6 * vh,
  },
  switchRow: {
    ...sheet.rowCenterSplit,
    width: '100%',
  },
  regularRide: {
    ...sheet.textSemiBold,
    fontSize: 4.5 * vw,
    color: colors.grayVeryDark,
  },
});

export default PickTime;
