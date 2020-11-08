import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {colors, sheet} from '../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/core';
import {CircleButton, StandardButton} from '../../common/buttons';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {DriverInfo, DriversRideInfo} from '../../Ride';
import {styles} from './index.styles';

const CustomDrawer = props => {
  const [ride, setRide] = useState(null);
  const [driversRide, setDriversRide] = useState(null);
  const navigation = useNavigation();

  // Store
  const driversRides = useSelector(state => state.driverReducer.driversRides);
  const userRides = useSelector(state => state.passengerReducer.userRides);
  const activeAccount = useSelector(
    state => state.accountReducer.activeAccount,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    !ride && dispatch(actions.getUsersRides());
    !driversRide && dispatch(actions.getDriversRides());
  }, []);

  useEffect(() => {
    if (userRides.data) {
      if (userRides.data.length) {
        setRide(userRides.data[0]);
      }
    }
  }, [userRides]);

  useEffect(() => {
    if (driversRides.data) {
      if (driversRides.data.length) {
        setDriversRide(driversRides.data[0]);
      }
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

  const renderTitle = () => {
    if (isPassenger) {
      return ride ? (
        <Text style={styles.upcomingRide}>Upcoming ride</Text>
      ) : (
        <Text style={styles.upcomingRide}>
          You don't have any upcoming rides
        </Text>
      );
    } else {
      return driversRide ? (
        <Text style={styles.upcomingRide}>Upcoming ride</Text>
      ) : (
        <Text style={styles.upcomingRide}>
          You don't have any upcoming rides
        </Text>
      );
    }
  };

  const renderCard = () =>
    isPassenger ? (
      <DriverInfo ride={ride} onPress={onRidePress} />
    ) : (
      <DriversRideInfo ride={driversRide} onPress={onDriversRidePress} />
    );

  return (
    <View style={styles.flexed}>
      <DrawerContentScrollView {...props} style={styles.flexed}>
        <View style={styles.flexed}>
          <View style={styles.userInfoContainer}>
            <CircleButton
              size={72}
              icon={
                <Ionicon name="md-person" color={colors.grayDark} size={44} />
              }
            />
            <View style={styles.userDataWrapper}>
              <Text style={styles.username}>John</Text>
              <View style={sheet.rowCenter}>
                <Text style={styles.rating}>5.00</Text>
                <Icon
                  name="star"
                  size={32}
                  color={colors.yellow}
                  style={{marginLeft: 8}}
                />
              </View>
            </View>
          </View>
          <View style={styles.rideInfoContainer}>
            {renderTitle()}
            {renderCard()}
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

export default CustomDrawer;
