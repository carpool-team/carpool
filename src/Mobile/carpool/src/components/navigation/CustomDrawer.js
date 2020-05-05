import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {vw, vh} from '../../utils/constants';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import sheet from '../../styles/sheet';
import UpView from '../common/UpView';
import {examplePassengerPoints} from '../../examples/points';
import {useNavigation} from '@react-navigation/core';
import {CircleButton, StandardButton} from '../common/buttons';

export default CustomDrawer = props => {
  const [ride, setRide] = React.useState(examplePassengerPoints[2]);
  const navigation = useNavigation();

  const {firstName, lastName} = ride.ride.user;

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.userInfoContainer}>
            <CircleButton
              size={18 * vw}
              icon={
                <Ionicon
                  name="md-person"
                  color={colors.grayDark}
                  size={11 * vw}
                />
              }
            />
            <View style={styles.userDataWrapper}>
              <Text style={styles.username}>John</Text>
              <View style={sheet.rowCenter}>
                <Text style={styles.rating}>5.00</Text>
                <Icon
                  name="star"
                  size={8 * vw}
                  color={colors.yellow}
                  style={{marginLeft: 2 * vw}}
                />
              </View>
            </View>
          </View>
          <View style={styles.rideInfoContainer}>
            <Text style={styles.upcomingRide}>Upcoming ride</Text>
            <UpView
              style={styles.rideCard}
              contentContainerStyle={styles.rideCardContent}
              borderRadius={4 * vw}
              onPress={() => navigation.navigate('Home', {ride})}>
              <Text
                style={styles.driversName}>{`${firstName} ${lastName}`}</Text>
              <Text
                style={
                  styles.leaving
                }>{`Leaving in ${ride.timeLeft} minutes`}</Text>
            </UpView>
          </View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <StandardButton
          width="65%"
          title="Logout"
          color={colors.red}
          onPress={() => null}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3 * vh,
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.1 * vh,
  },
  userDataWrapper: {
    height: 18 * vw,
    flex: 1,
    paddingLeft: 4 * vw,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 2.5 * vh,
    color: colors.blue,
    ...sheet.textSemiBold,
  },
  rating: {
    color: colors.grayDark,
    fontSize: 2.5 * vh,
    ...sheet.textSemiBold,
  },
  rideInfoContainer: {
    paddingHorizontal: 16,
    paddingTop: 2 * vh,
    paddingBottom: 4 * vh,
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.1 * vh,
  },
  upcomingRide: {
    fontSize: 2 * vh,
    color: colors.green,
    ...sheet.textMedium,
    marginBottom: 2 * vh,
  },
  rideCard: {
    width: '100%',
    height: 10 * vh,
  },
  rideCardContent: {
    paddingVertical: 1.5 * vh,
    paddingHorizontal: 4 * vw,
    justifyContent: 'space-between',
  },
  driversName: {
    ...sheet.textBold,
    fontSize: 1.8 * vh,
    color: colors.grayDark,
  },
  leaving: {
    ...sheet.textBold,
    fontSize: 1.8 * vh,
    color: colors.red,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 5 * vh,
  },
  logout: {
    color: colors.red,
    fontSize: 2.25 * vh,
    ...sheet.textBold,
  },
});
