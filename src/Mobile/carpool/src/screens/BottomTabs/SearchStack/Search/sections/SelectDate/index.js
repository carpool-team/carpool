import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../../../../../styles';
import {StandardButton} from '../../../../../../components/common/buttons';
import {styles} from './index.styles';
import moment from 'moment';
import Slider from '@react-native-community/slider';

const SelectDate = ({onSubmit}) => {
  const [date, setDate] = useState(new Date());
  const [period, setPeriod] = useState(null);
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    const df = 24 - parseInt(moment(date).format('H'));
    setDiff(df);
    setPeriod(df);
  }, [date]);

  const onSubmitSingular = () => {
    const prd = period === diff ? null : period;
    onSubmit(moment(date).toISOString(), prd);
  };

  return (
    <View style={styles.container}>
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
        <View
          style={{
            width: '100%',
            marginTop: 30,
            opacity: diff > 1 ? 1 : 0.5,
          }}>
          <View style={styles.timeSlotWrapper}>
            <Text style={styles.timeSlot}>{`Time slot: ${period} hour${
              period > 1 ? 's' : ''
            }`}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={diff}
            step={1}
            value={period}
            onValueChange={setPeriod}
          />
          <View style={styles.underSlider}>
            <Text style={styles.value}>1</Text>
            <Text style={styles.value}>{diff}</Text>
          </View>
        </View>
        <StandardButton
          style={styles.button}
          width="65%"
          onPress={onSubmitSingular}
          title="Next"
          color={colors.blue}
        />
      </View>
    </View>
  );
};

export default SelectDate;
