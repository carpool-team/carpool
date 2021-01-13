import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors} from '../../../../styles';
import moment from 'moment';
import {RouteMinimap} from '../../../../components/Route';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {GroupWaypointsStop} from '../../../../components/Ride';
import {GoBack, Header} from '../../../../components/navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../../store/actions';
import {styles} from './index.styles';
import {sortStops} from '../../../../utils/sortStops';

const PassengersRideDetails = ({navigation, route}) => {
  const {ride, past} = route.params;
  const [stops, setStops] = useState(null);

  const userId = useSelector(state => state.accountReducer.user.data.id);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <GoBack onPress={() => navigation.navigate('RidesList')} />
      ),
      header: props => <Header {...props} />,
    });
  }, []);

  useEffect(() => {
    if (ride) {
      const {sortedStops} = sortStops(
        ride.location,
        ride.group.location,
        ride.stops,
      );
      setStops(sortedStops.map(item => ({coordinates: item})));
    }
  }, [ride]);

  const onResignPress = () =>
    Alert.alert('Warning!', 'Are you sure you want to resign?', [
      {
        text: 'Cancel',
        style: 'default',
      },
      {
        text: 'Resign',
        style: 'destructive',
        onPress: () => {
          dispatch(actions.resignFromRide(ride.rideId))
            .then(() => navigation.goBack())
            .catch(err => alert('Error ocurred'));
        },
      },
    ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.time}>
            {moment(ride.rideDate).format('HH:mm ')}
          </Text>
          <Text style={styles.date}>
            {moment(ride.rideDate).format('Do MMMM YYYY')}
          </Text>
        </View>
        {!past && (
          <TouchableOpacity onPress={onResignPress}>
            <MaterialIcon name="exit-to-app" size={32} color={colors.orange} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}>
        <View style={styles.mapWrapper}>
          {!!stops && (
            <RouteMinimap
              stops={ride.rideDirection ? stops.reverse() : stops}
              hideDetails={past}
            />
          )}
        </View>
        <View style={styles.waypoints}>
          <GroupWaypointsStop
            group={ride.group}
            location={{coordinates: ride.location}}
            swap={ride.rideDirection}
            stop={ride.stops.find(
              item => item.participant.participantId === userId,
            )}
          />
        </View>
        <View style={styles.driverWrapper}>
          <FontAwesomeIcon
            name="drivers-license"
            color={colors.grayDark}
            size={32}
          />
          <Text style={styles.driver}>{`${ride.owner.firstName} ${
            ride.owner.lastName
          }`}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PassengersRideDetails;
