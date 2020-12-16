import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {colors} from '../../../../../../styles';
import {StandardButton} from '../../../../../../components/common/buttons';

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

const styles = StyleSheet.create({
  singularContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 54,
  },
  button: {
    marginTop: 50,
  },
});

export default SelectDate;
