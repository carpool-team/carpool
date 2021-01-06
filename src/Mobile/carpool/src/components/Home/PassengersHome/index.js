import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler, RefreshControl} from 'react-native';
import {sheet, colors} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import {RideDetailsCard} from '../../Ride';
import {useSelector, useDispatch} from 'react-redux';
import {ListEmptyComponent} from '../../common/lists';
import {ThreeGroupsList} from '../../Groups';
import {styles} from './index.styles';
import {SafeScroll} from '../../common/wrappers';
import NewInvitations from '../NewInvitations';
import * as actions from '../../../store/actions';

const PassengersHome = () => {
  const navigation = useNavigation();
  const [ride, setRide] = useState(null);

  const userRides = useSelector(state => state.passengerReducer.userRides);
  const groups = useSelector(store => store.accountReducer.groups);
  const invitationCount = useSelector(store =>
    store.accountReducer.invitations.data
      ? store.accountReducer.invitations.data.length
      : 0,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  useEffect(() => {
    if (userRides.data) {
      setRide(userRides.data[0]);
    }
  }, [userRides]);

  const onInvitationsPress = () =>
    navigation.navigate('GroupsStack', {
      screen: 'Invitations',
    });

  const onRefresh = () => {
    dispatch(actions.getGroups());
    dispatch(actions.getUsersRides());
  };

  return (
    <SafeScroll
      minHeight={500}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          colors={[colors.blue]}
          refreshing={groups.loading || userRides.loading}
          tintColor={colors.blue}
        />
      }>
      <View style={styles.container}>
        <View style={sheet.rowCenterSplit}>
          <Text style={styles.title}>Upcoming ride</Text>
          <Text
            onPress={() => navigation.navigate('RidesStack')}
            style={styles.seeAll}>
            See all
          </Text>
        </View>
        <View style={styles.flexed}>
          {userRides.loading ? null : ride ? (
            <RideDetailsCard
              ride={ride}
              onItemPress={ride =>
                navigation.navigate('RidesStack', {
                  screen: 'PassengersRideDetails',
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
          <Text
            onPress={() =>
              navigation.navigate('GroupsStack', {
                screen: 'Groups',
              })
            }
            style={styles.seeAll}>
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

export default PassengersHome;
