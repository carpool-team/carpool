import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {colors, sheet} from '../../../../../styles';
import {
  CircleButton,
  StandardButton,
} from '../../../../../components/common/buttons';
import {AddRideActions} from '../../reducer';
import {styles} from './index.styles';

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
          <Ionicon name="ios-car" size={75} color={colors.grayVeryDark} />
        </View>
        <View style={[sheet.rowCenterSplit, styles.buttonsWrapper]}>
          <CircleButton
            size={50}
            onPress={onDecrement}
            icon={<FAIcon name="minus" size={20} color={colors.grayDark} />}
          />
          <Text style={styles.numOfSeats}>{seats}</Text>
          <CircleButton
            size={50}
            onPress={onIncrement}
            icon={<FAIcon name="plus" size={20} color={colors.grayDark} />}
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

export default SetSeats;
