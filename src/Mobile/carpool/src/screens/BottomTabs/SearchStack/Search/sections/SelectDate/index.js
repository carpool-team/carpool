import React, {useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../../../../../styles';
import {StandardButton} from '../../../../../../components/common/buttons';
import {styles} from './index.styles';

const SelectDate = ({onSubmit}) => {
  const [date, setDate] = useState(new Date());

  const onSubmitSingular = () => onSubmit(date);

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
