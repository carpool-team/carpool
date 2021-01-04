import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors, sheet} from '../../../styles';
import moment from 'moment';
import {RouteMinimap} from '../../../components/Route';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {GroupWaypointsStop} from '../../../components/Ride';
import {GoBack, Header} from '../../../components/navigation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';

const PassengersRideDetails = ({navigation, route}) => {
  const {ride, past} = route.params;

  const userId = useSelector(state => state.accountReducer.user.data.id);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <GoBack onPress={() => navigation.navigate('RidesList')} />
      ),
      header: props => <Header {...props} hideSwitch />,
    });
  }, []);

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
          <RouteMinimap
            stops={
              ride.rideDirection
                ? [
                    {coordinates: ride.group.location},
                    {coordinates: ride.location},
                  ]
                : [
                    {coordinates: ride.location},
                    {coordinates: ride.group.location},
                  ]
            }
            hideDetails={past}
          />
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  container: {
    paddingBottom: 30,
  },
  topRow: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    ...sheet.rowCenterSplit,
  },
  time: {
    ...sheet.textMedium,
    fontSize: 20,
    color: colors.blue,
  },
  date: {
    ...sheet.textMedium,
    fontSize: 16,
    color: colors.grayDark,
    marginTop: 5,
  },
  mapWrapper: {
    height: 300,
  },
  waypoints: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  driverWrapper: {
    ...sheet.rowCenter,
    padding: 16,
  },
  driver: {
    ...sheet.textMedium,
    color: colors.grayVeryDark.slic,
    fontSize: 18,
    marginLeft: 16,
  },
});

export default PassengersRideDetails;
