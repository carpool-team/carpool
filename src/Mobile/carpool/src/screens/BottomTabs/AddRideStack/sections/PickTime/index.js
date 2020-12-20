import React, {useState, useMemo} from 'react';
import {View, Text, Switch} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PickDays from '../../../../../components/Driver/AddRide/PickDays';
import {StandardButton} from '../../../../../components/common/buttons';
import {colors} from '../../../../../styles';
import {AddRideActions} from '../../reducer';
import {styles} from './index.styles';

const PickTime = ({dispatch}) => {
  const [isRegular, setIsRegular] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [days, setDays] = useState([0, 0, 0, 0, 0, 0, 0]);

  const canSubmit = useMemo(() => {
    return days.includes(1);
  }, [days]);

  const onSubmitSingular = () => {
    dispatch({
      type: AddRideActions.SET_DATE,
      payload: date,
    });
    dispatch({type: AddRideActions.SET_REGULAR, payload: false});
  };

  const onSubmitRegular = () => {
    const cp = [...days];
    const mappedDays = parseInt(cp.reverse().join(''), 2);
    dispatch({type: AddRideActions.SET_DAYS, payload: mappedDays});
    dispatch({
      type: AddRideActions.SET_TIME,
      payload: time,
    });
    dispatch({type: AddRideActions.SET_REGULAR, payload: true});
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
    <View style={styles.container}>
      <View style={styles.switchRow}>
        <Text style={styles.regularRide}>Regular ride</Text>
        <Switch value={isRegular} onValueChange={setIsRegular} />
      </View>
      {isRegular ? renderRegular() : renderSingular()}
    </View>
  );
};

export default PickTime;