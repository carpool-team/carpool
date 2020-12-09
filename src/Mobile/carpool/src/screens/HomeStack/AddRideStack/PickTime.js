import React, {useState, useContext, useMemo} from 'react';
import {View, Text, SafeAreaView, Switch, StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';
import DatePicker from 'react-native-date-picker';
import PickDays from '../../../components/Driver/AddRide/PickDays';
import {StandardButton} from '../../../components/common/buttons';
import {AddRideContext, AddRideContextActions} from './context';

const PickTime = ({navigation}) => {
  const [isRegular, setIsRegular] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [days, setDays] = useState([0, 0, 0, 0, 0, 0, 0]);

  const {dispatch} = useContext(AddRideContext);

  const canSubmit = useMemo(() => {
    return days.includes(1);
  }, [days]);

  const onSubmitSingular = () => {
    dispatch({
      type: AddRideContextActions.SET_DATE,
      payload: date,
    });
    navigation.navigate('SetSeats');
  };

  const onSubmitRegular = () => {
    const cp = [...days];
    const mappedDays = parseInt(cp.reverse().join(''), 2);
    dispatch({type: AddRideContextActions.SET_DAYS, payload: mappedDays});
    dispatch({
      type: AddRideContextActions.SET_TIME,
      payload: time,
    });
    dispatch({type: AddRideContextActions.SET_REGULAR, payload: true});
    navigation.navigate('SetSeats');
  };

  const renderSingular = () => (
    <View style={styles.singularContainer}>
      <DatePicker
        date={date}
        onDateChange={setDate}
        locale="pl"
        minimumDate={new Date()}
        minuteInterval={10}
        androidVariant="nativeAndroid"
        locale="en"
        is24hourSource="locale"
      />
      <StandardButton
        style={{marginTop: 50}}
        width="65%"
        onPress={onSubmitSingular}
        title="Next"
        color={colors.blue}
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
        androidVariant="nativeAndroid"
        locale="en"
        style={styles.picker}
      />
      <View style={{width: '100%', marginTop: 50}}>
        <PickDays days={days} setDays={setDays} />
      </View>
      {canSubmit && (
        <StandardButton
          style={{marginTop: 50}}
          width="65%"
          onPress={onSubmitRegular}
          title="Next"
          color={colors.blue}
        />
      )}
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
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 54,
  },
  switchRow: {
    ...sheet.rowCenterSplit,
    width: '100%',
  },
  regularRide: {
    ...sheet.textSemiBold,
    fontSize: 18,
    color: colors.grayVeryDark,
  },
  picker: {
    marginTop: 40,
  },
});

export default PickTime;
