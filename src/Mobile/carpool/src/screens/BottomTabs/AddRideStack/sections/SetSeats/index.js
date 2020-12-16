import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {colors, sheet} from '../../../../../styles';
import {
  CircleButton,
  StandardButton,
} from '../../../../../components/common/buttons';
import {AddRideActions} from '../../reducer';

const MIN_VALUE = 1;
const MAX_VALUE = 23;

const SetSeats = ({dispatch}) => {
  const [seats, setSeats] = useState(MIN_VALUE);

  const onSubmit = () => {
    dispatch({type: AddRideActions.SET_SEATS, payload: seats});
  };

  const onIncrement = () => {
    if (seats < MAX_VALUE) {
      setSeats(seats => seats + 1);
    } else {
      return;
    }
  };

  const onDecrement = () => {
    if (seats > MIN_VALUE) {
      setSeats(seats => seats - 1);
    } else {
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.seats}>SEATS</Text>
      <View style={[sheet.rowCenterSplit, styles.carWrapper]}>
        <View style={[sheet.rowCenter, styles.car]}>
          <Ionicon name="ios-car" size={100} color={colors.grayVeryDark} />
        </View>
        <View style={[sheet.rowCenterSplit, styles.buttonsWrapper]}>
          <CircleButton
            onPress={onDecrement}
            icon={<FAIcon name="minus" size={24} color={colors.grayVeryDark} />}
          />
          <Text style={styles.numOfSeats}>{seats}</Text>
          <CircleButton
            onPress={onIncrement}
            icon={<FAIcon name="plus" size={24} color={colors.grayVeryDark} />}
          />
        </View>
      </View>
      <StandardButton
        width="65%"
        onPress={onSubmit}
        title="Next"
        color={colors.blue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 54,
  },
  seats: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 24,
  },
  carWrapper: {
    width: '100%',
  },
  car: {
    flex: 2,
  },
  buttonsWrapper: {
    flex: 3,
  },
  numOfSeats: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 32,
  },
});

export default SetSeats;
