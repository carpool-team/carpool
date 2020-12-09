import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {AccountSwitch} from '../../../../components/navigation';
import {sheet, colors} from '../../../../styles';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../../store/actions';
import {UpView} from '../../../../components/common';
import moment from 'moment';
import {ListEmptyComponent} from '../../../../components/common/lists';
import {GroupWaypoints} from '../../../../components/Ride';
import {useActiveAccount} from '../../../../hooks';

const Home = ({navigation}) => {
  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  const [ride, setRide] = useState(null);

  const driversRides = useSelector(state => state.driverReducer.driversRides);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getDriversRides());
  }, []);

  useEffect(() => {
    if (driversRides.data) {
      setRide(driversRides.data[0]);
    }
  }, [driversRides]);

  console.log(ride);

  return isPassenger ? (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <AccountSwitch />
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <AccountSwitch />
        </View>
        <View style={sheet.rowCenterSplit}>
          <Text style={styles.title}>Upcoming ride</Text>
          <Text
            onPress={() => navigation.navigate('DriversRides')}
            style={styles.seeAll}>
            See all
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flex: 1,
          }}>
          {driversRides.loading ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator color={colors.blue} size="large" />
            </View>
          ) : ride ? (
            <UpView
              onPress={() =>
                navigation.navigate('RidesStack', {
                  screen: 'DriversRideDetails',
                  params: {ride, past: false},
                })
              }
              borderRadius={12}
              style={{
                height: 140,
                marginTop: 16,
              }}
              contentContainerStyle={{
                padding: 16,
                justifyContent: 'space-between',
              }}>
              <View style={sheet.rowCenterSplit}>
                <Text
                  style={{
                    ...sheet.textMedium,
                    color: colors.orange,
                    fontSize: 20,
                  }}>
                  {moment(ride.rideDate).format('HH:mm')}
                </Text>
                <Text
                  style={{
                    ...sheet.textMedium,
                    color: colors.grayDark,
                    fontSize: 16,
                  }}>
                  {moment(ride.rideDate).format('Do MMMM YYYY')}
                </Text>
              </View>
              <GroupWaypoints
                group={ride.group}
                location={{coordinates: ride.location}}
                swap={ride.rideDirection}
              />
            </UpView>
          ) : (
            <ListEmptyComponent title="You don't have any upcoming rides" />
          )}
        </View>
        <View style={sheet.rowCenterSplit}>
          <Text style={styles.title}>Your groups</Text>
          <Text
            onPress={() => navigation.navigate('Groups')}
            style={styles.seeAll}>
            See all
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flex: 1,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  title: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 20,
    paddingVertical: 8,
  },
  seeAll: {
    ...sheet.textMedium,
    color: colors.blue,
    fontSize: 16,
  },
  loadingWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
