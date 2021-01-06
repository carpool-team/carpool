import React, {useState, useEffect} from 'react';
import {View, Text, RefreshControl} from 'react-native';
import {sheet, colors} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import {RideDetailsCard} from '../../Ride';
import {useSelector, useDispatch} from 'react-redux';
import {ListEmptyComponent} from '../../common/lists';
import {ThreeGroupsList} from '../../Groups';
import {styles} from './index.styles';
import {SafeScroll} from '../../common/wrappers';
import NewInvitations from '../NewInvitations';
import PendingRideRequest from '../PendingRideRequests';
import * as actions from '../../../store/actions';

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
  const invitationCount = useSelector(store =>
    store.accountReducer.invitations.data
      ? store.accountReducer.invitations.data.length
      : 0,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (driversRides.data) {
      setRide(driversRides.data[0]);
    }
  }, [driversRides]);

  const onRideRequestsPress = () =>
    navigation.navigate('RidesStack', {
      screen: 'RideRequests',
    });

  const onInvitationsPress = () =>
    navigation.navigate('GroupsStack', {
      screen: 'Invitations',
    });

  const onAllRidesPress = () => navigation.navigate('RidesStack');

  const onAllGroupsPress = () => navigation.navigate('GroupsStack');

  const onRefresh = () => {
    dispatch(actions.getGroups());
    dispatch(actions.getDriversRides());
  };

  return (
    <SafeScroll
      minHeight={700}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          colors={[colors.blue]}
          refreshing={groups.loading || driversRides.loading}
          tintColor={colors.blue}
        />
      }>
      <PendingRideRequest count={requestsCount} onPress={onRideRequestsPress} />
      <View style={styles.container}>
        <View style={sheet.rowCenterSplit}>
          <Text style={styles.title}>Upcoming ride</Text>
          <Text onPress={onAllRidesPress} style={styles.seeAll}>
            See all
          </Text>
        </View>
        <View style={styles.flexed}>
          {driversRides.loading ? null : ride ? (
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
        <NewInvitations count={invitationCount} onPress={onInvitationsPress} />
        <View style={sheet.rowCenterSplit}>
          <Text style={styles.title}>Your groups</Text>
          <Text onPress={onAllGroupsPress} style={styles.seeAll}>
            More
          </Text>
        </View>
        <View style={styles.flexed}>
          <ThreeGroupsList
            groups={groups.data}
            loading={groups.loading}
            onItemPress={group =>
              navigation.navigate('GroupsStack', {
                screen: 'GroupDetails',
                params: {group},
              })
            }
          />
        </View>
      </View>
    </SafeScroll>
  );
};

export default DriversHome;
