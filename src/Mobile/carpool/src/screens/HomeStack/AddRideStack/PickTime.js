import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Switch} from 'react-native';
import {colors, sheet} from '../../../styles';
import {vw, vh} from '../../../utils/constants';
import DatePicker from 'react-native-date-picker';
import {UpView} from '../../../components/common';
import PickDays from '../../../components/AddRide/PickDays';
import {StandardButton} from '../../../components/common/buttons';

const PickTime = () => {
  const [isRegular, setIsRegular] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const renderSingular = () => (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
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
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 6 * vw,
          paddingTop: 4 * vh,
          paddingBottom: 6 * vh,
        }}>
        <View
          style={{
            ...sheet.rowCenterSplit,
            width: '100%',
          }}>
          <Text
            style={{
              ...sheet.textSemiBold,
              fontSize: 4.5 * vw,
              color: colors.grayVeryDark,
            }}>
            Regular ride
          </Text>
          <Switch value={isRegular} onValueChange={setIsRegular} />
        </View>
        {isRegular ? renderRegular() : renderSingular()}
        <StandardButton
          style={{}}
          width="65%"
          onPress={() => null}
          title="Next"
          color={colors.blue}
        />
      </View>
    </SafeAreaView>
  );
};

export default PickTime;
