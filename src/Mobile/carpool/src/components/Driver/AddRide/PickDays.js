import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';
import {UpView} from '../../common';

const weekDays = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];

const PickDays = () => {
  const [days, setDays] = useState([
    true,
    true,
    true,
    true,
    true,
    false,
    false,
  ]);

  const onItemPress = index => {
    const daysCopy = [...days];

    if (daysCopy[index]) {
      daysCopy[index] = false;
    } else {
      daysCopy[index] = true;
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

  return (
    <View
      style={{
        ...sheet.rowCenterSplit,
        width: '100%',
      }}>
      {renderDays()}
    </View>
  );
};

const styles = StyleSheet.create({
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
