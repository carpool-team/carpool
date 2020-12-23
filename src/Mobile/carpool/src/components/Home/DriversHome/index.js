import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {sheet, colors} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import {RideDetailsCard} from '../../Ride';
import {useSelector} from 'react-redux';
import {ListEmptyComponent} from '../../common/lists';
import {ThreeGroupsList} from '../../Groups';
import {styles} from './index.styles';
import {SafeScroll} from '../../common/wrappers';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const DriversHome = () => {
  const navigation = useNavigation();
  const [ride, setRide] = useState(null);

  const driversRides = useSelector(state => state.driverReducer.driversRides);
  const groups = useSelector(store => store.accountReducer.groups);
  const requestsCount = useSelector(store =>
    store.driverReducer.rideRequests.data
      ? store.driverReducer.rideRequests.data.length
      : 0,
  );

  useEffect(() => {
    if (driversRides.data) {
      setRide(driversRides.data[0]);
    }
  }, [driversRides]);

  const onRideRequestsPress = () =>
    navigation.navigate('RidesStack', {
      screen: 'RideRequests',
    });

  const onAllRidesPress = () => navigation.navigate('RidesStack');

  const onAllGroupsPress = () => navigation.navigate('GroupsStack');

  return (
    <SafeScroll minHeight={600}>
      {!!requestsCount && (
        <TouchableOpacity
          onPress={onRideRequestsPress}
          style={styles.topButton}>
          <Text style={styles.count}>{`${requestsCount} pending ride request${
            requestsCount > 1 ? 's' : ''
          }`}</Text>
          <MaterialIcon name="add-location" color={colors.green} size={32} />
        </TouchableOpacity>
      )}
      <View style={styles.container}>
        <View style={sheet.rowCenterSplit}>
          <Text style={styles.title}>Upcoming ride</Text>
          <Text onPress={onAllRidesPress} style={styles.seeAll}>
            See all
          </Text>
        </View>
        <View style={styles.flexed}>
          {driversRides.loading ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator color={colors.blue} size="large" />
            </View>
          ) : ride ? (
            <RideDetailsCard
              ride={ride}
              onItemPress={ride =>
                navigation.navigate('RidesStack', {
                  screen: 'DriversRideDetails',
                  params: {ride, past: false},
                })
              }
            />
          ) : (
            <ListEmptyComponent title="You don't have any upcoming rides" />
          )}
        </View>
        <View style={sheet.rowCenterSplit}>
          <Text style={styles.title}>Your groups</Text>
          <Text onPress={onAllGroupsPress} style={styles.seeAll}>
            More
          </Text>
        </View>
        <View style={styles.flexed}>
          {groups.loading ? (
            <View style={styles.loadingWrapper}>
              <ActivityIndicator color={colors.blue} size="large" />
            </View>
          ) : groups.data ? (
            <ThreeGroupsList
              groups={groups.data}
              onItemPress={group =>
                navigation.navigate('GroupsStack', {
                  screen: 'GroupDetails',
                  params: {group},
                })
              }
            />
          ) : (
            <ListEmptyComponent title="You are not a member of any group yet" />
          )}
        </View>
      </View>
    </SafeScroll>
  );
};

export default DriversHome;
