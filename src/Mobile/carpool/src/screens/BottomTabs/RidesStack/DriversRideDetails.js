import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {colors, sheet} from '../../../styles';
import {RouteMinimap} from '../../../components/Route';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GroupWaypoints} from '../../../components/Ride';
import moment from 'moment';
import PassengersList from '../../../components/Driver/PassengersList';
import * as actions from '../../../store/actions';
import {useDispatch} from 'react-redux';
import {GoBack, Header} from '../../../components/navigation';

const DriversRideDetails = ({navigation, route}) => {
  const {ride, past} = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <GoBack onPress={() => navigation.navigate('RidesList')} />
      ),
      header: props => <Header {...props} hideSwitch />,
      title: ride.recurringRideId ? 'Regular ride' : 'Single ride',
    });
  }, []);

  const onDeletePress = () => {
    if (ride.recurringRideId) {
      Alert.alert(
        'Warning!',
        'This is a regular ride, do you want to delete all rides or just this parcitular one?',
        [
          {
            text: 'Delete one',
            style: 'destructive',
            onPress: () => {
              dispatch(actions.deleteRide(ride.rideId))
                .then(() => navigation.goBack())
                .catch(err => alert('Error ocurred'));
            },
          },
          {
            text: 'Delete all',
            style: 'destructive',
            onPress: () => {
              dispatch(actions.deleteRegularRide(ride.recurringRideId))
                .then(() => navigation.goBack())
                .catch(err => alert('Error ocurred'));
            },
          },
          {
            text: 'Cancel',
            style: 'default',
          },
        ],
      );
    } else {
      Alert.alert('Warning!', 'Are you sure you want to delete this ride?', [
        {
          text: 'Cancel',
          style: 'default',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(actions.deleteRide(ride.rideId))
              .then(() => navigation.goBack())
              .catch(err => alert('Error ocurred'));
          },
        },
      ]);
    }
  };

  const onItemPress = item => {
    Alert.alert(
      'Warning!',
      `Are you sure you want to delete ${item.participant.firstName} ${
        item.participant.lastName
      } from this ride?`,
      [
        {
          text: 'Cancel',
          style: 'default',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(
              actions.deleteParticipant({
                rideId: ride.rideId,
                userId: item.participant.participantId,
              }),
            )
              .then(() => navigation.goBack())
              .catch(err => alert('Error ocurred'));
          },
        },
      ],
    );
  };

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
          <TouchableOpacity onPress={onDeletePress}>
            <Icon
              name="trash"
              size={32}
              color={colors.red}
              style={styles.moreIcon}
            />
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
        <View style={styles.bottomWrapper}>
          <View style={styles.waypoints}>
            <GroupWaypoints
              group={ride.group}
              location={{coordinates: ride.location}}
              swap={ride.rideDirection}
            />
          </View>
          <View style={styles.passengersList}>
            <PassengersList ride={ride} onItemPress={onItemPress} />
          </View>
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
    fontSize: 24,
    color: colors.blue,
  },
  date: {
    ...sheet.textMedium,
    fontSize: 16,
    color: colors.grayDark,
    marginTop: 5,
  },
  moreIcon: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  mapWrapper: {
    height: 300,
  },
  waypoints: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  bottomWrapper: {
    flex: 1,
    paddingVertical: 8,
  },
  upView: {
    width: '46%',
    height: 100,
  },
  passengersList: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
});

export default DriversRideDetails;
