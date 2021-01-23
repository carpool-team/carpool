import React, {useState, useMemo} from 'react';
import {View, Text, Switch} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PickDays from '../../../../../components/Driver/AddRide/PickDays';
import {StandardButton} from '../../../../../components/common/buttons';
import {colors} from '../../../../../styles';
import {AddRideActions} from '../../reducer';
import {styles} from './index.styles';
import PickWeeks from '../../../../../components/Driver/AddRide/PickWeeks';
import {SafeScroll} from '../../../../../components/common/wrappers';

const PickTime = ({dispatch}) => {
  const [isRegular, setIsRegular] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [days, setDays] = useState([1, 1, 1, 1, 1, 0, 0]);
  const [weeks, setWeeks] = useState(4);

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
    dispatch({type: AddRideActions.SET_WEEKS, payload: weeks});
  };

  const onSubtractWeeks = () => setWeeks(weeks - 1);

  const onAddWeeks = () => setWeeks(weeks + 1);

  const renderSingular = () => (
    <View style={styles.singularContainer}>
      <DatePicker
        date={date}
        onDateChange={setDate}
        minimumDate={new Date()}
        minuteInterval={10}
        androidVariant="nativeAndroid"
        locale="en"
        is24hourSource="device"
      />
      <StandardButton
        style={{marginTop: 30}}
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
        minuteInterval={10}
        mode="time"
        androidVariant="nativeAndroid"
        locale="en"
        style={styles.picker}
        is24hourSource="device"
      />
      <View style={{width: '100%', marginTop: 30, marginBottom: 10}}>
        <Text style={styles.sectionTitle}>Days of the week</Text>
        <PickDays days={days} setDays={setDays} />
      </View>
      <View style={{width: '100%', paddingVertical: 24}}>
        <Text style={styles.sectionTitle}>Number of weeks</Text>
        <PickWeeks
          weeks={weeks}
          onSubtractWeeks={onSubtractWeeks}
          onAddWeeks={onAddWeeks}
        />
      </View>
      {canSubmit && (
        <StandardButton
          style={{marginTop: 30}}
          width="65%"
          onPress={onSubmitRegular}
          title="Next"
          color={colors.blue}
        />
      )}
    </View>
  );

  return (
    <SafeScroll minHeight={700}>
      <View style={styles.container}>
        <View style={styles.switchRow}>
          <Text style={styles.regularRide}>Regular ride</Text>
          <Switch value={isRegular} onValueChange={setIsRegular} />
        </View>
        {isRegular ? renderRegular() : renderSingular()}
      </View>
    </SafeScroll>
  );
};

export default PickTime;
