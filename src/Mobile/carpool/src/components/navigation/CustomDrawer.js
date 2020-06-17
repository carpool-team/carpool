import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {vw, vh} from '../../utils/constants';
import {colors, sheet} from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import {CircleButton, StandardButton} from '../common/buttons';
import DriverInfo from '../Ride/DriverInfo';
import {
  createGetUserRides,
  PassengerContext,
} from '../../context/PassengerContext';
import {DriverContext} from '../../context/DriverContext';
import {AccountContext} from '../../context/AccountContext';
import DriversRideInfo from '../Ride/DriversRideInfo';

export default CustomDrawer = props => {
  const [ride, setRide] = useState(null);
  const [driversRide, setDriversRide] = useState(null);
  const navigation = useNavigation();

  // Store
  const {
    passengerState: {userRides},
    dispatch,
  } = useContext(PassengerContext);
  const {
    driverState: {driversRides},
    dispatch: driverDispatch,
  } = useContext(DriverContext);
  const {
    accountState: {activeAccount},
    dispatch: accountDispatch,
  } = React.useContext(AccountContext);

  useEffect(() => {
    if (!ride) {
      createGetUserRides(dispatch);
    }
  }, []);

  useEffect(() => {
    if (userRides.data.length) {
      setRide(userRides.data[0]);
    }
  }, [userRides]);

  useEffect(() => {
    if (driversRides.data.length) {
      setDriversRide(driversRides.data[0]);
    }
  }, [driversRides]);

  const onRidePress = () => {
    navigation.navigate('Home', {ride});
  };

  const onDriversRidePress = () => {
    navigation.navigate('Rides', {
      screen: 'DriversRideDetails',
      params: {ride: driversRide},
    });
  };

  const isPassenger = activeAccount === 'passenger';

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
            {ride ? (
              <Text style={styles.upcomingRide}>Upcoming ride</Text>
            ) : (
              <Text style={styles.upcomingRide}>
                You don't have ant upcoming rides
              </Text>
            )}
            {isPassenger ? (
              <DriverInfo ride={ride} onPress={onRidePress} />
            ) : (
              <DriversRideInfo
                ride={driversRide}
                onPress={onDriversRidePress}
              />
            )}
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
