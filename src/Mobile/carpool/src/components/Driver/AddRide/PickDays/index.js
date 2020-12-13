import React from 'react';
import {View, Text} from 'react-native';
import {sheet, colors} from '../../../../styles';
import UpView from '../../../common/UpView';
import {styles} from './index.styles';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const PickDays = ({days, setDays, disabled = false}) => {
  const onItemPress = index => {
    const daysCopy = [...days];

    if (daysCopy[index]) {
      daysCopy[index] = 0;
    } else {
      daysCopy[index] = 1;
    }

    setDays([...daysCopy]);
  };

  const renderDays = () =>
    weekDays.map((item, index) => {
      const circleColor = days[index] ? colors.blue : colors.background;
      const textColor = days[index] ? '#fff' : colors.grayDark;

      return (
        <UpView
          key={item}
          style={styles.circle}
          contentContainerStyle={{
            ...sheet.center,
            backgroundColor: circleColor,
          }}
          borderRadius={99999}
          onPress={disabled ? undefined : () => onItemPress(index)}>
          <Text
            style={{
              ...styles.circleLabel,
              color: textColor,
            }}>
            {item}
          </Text>
        </UpView>
      );
    });

  return <View style={styles.container}>{renderDays()}</View>;
};

export default PickDays;
