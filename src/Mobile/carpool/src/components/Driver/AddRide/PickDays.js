import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';
import {UpView} from '../../common';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const PickDays = ({days, setDays}) => {
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
          onPress={() => onItemPress(index)}>
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

const styles = StyleSheet.create({
  container: {
    ...sheet.rowCenterSplit,
    width: '100%',
    marginTop: 50,
  },
  circle: {
    width: 40,
    height: 40,
  },
  circleLabel: {
    ...sheet.textMedium,
    fontSize: 12,
  },
});

export default PickDays;
