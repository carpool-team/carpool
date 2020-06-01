import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {vw, vh} from '../../../utils/constants';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {colors, sheet} from '../../../styles';
import {CircleButton, StandardButton} from '../../../components/common/buttons';

const MIN_VALUE = 0;
const MAX_VALUE = 4;

const SetSeats = ({navigation}) => {
  const [seats, setSeats] = useState(0);

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
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text
          style={{
            ...sheet.textSemiBold,
            color: colors.grayDark,
            fontSize: 6 * vw,
          }}>
          SEATS
        </Text>
        <View style={[sheet.rowCenterSplit, {width: '100%'}]}>
          <View style={[sheet.rowCenter, {flex: 2}]}>
            <Ionicon
              name="ios-car"
              size={25 * vw}
              color={colors.grayVeryDark}
            />
          </View>
          <View style={[sheet.rowCenterSplit, {flex: 3}]}>
            <CircleButton
              onPress={onDecrement}
              icon={
                <FAIcon
                  name="minus"
                  size={6 * vw}
                  color={colors.grayVeryDark}
                />
              }
            />
            <Text
              style={{
                ...sheet.textSemiBold,
                color: colors.blue,
                fontSize: 8 * vw,
              }}>
              {seats}
            </Text>
            <CircleButton
              onPress={onIncrement}
              icon={
                <FAIcon name="plus" size={6 * vw} color={colors.grayVeryDark} />
              }
            />
          </View>
        </View>
        <StandardButton
          width="65%"
          onPress={() => navigation.navigate('Home')}
          title="Submit"
          color={colors.blue}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 6 * vw,
    paddingTop: 4 * vh,
    paddingBottom: 6 * vh,
  },
});

export default SetSeats;
