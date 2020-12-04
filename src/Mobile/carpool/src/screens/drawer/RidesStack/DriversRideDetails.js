import React from 'react';
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
import {parseCoords} from '../../../utils/coords';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Waypoints} from '../../../components/Ride';
import moment from 'moment';
import PassengersList from '../../../components/Driver/PassengersList';

const DriversRideDetails = ({navigation, route}) => {
  const {ride, past} = route.params;

  const onDeletePress = () =>
    Alert.alert('Warning!', 'Are you sure you want to delete this ride?', [
      {
        text: 'Cancel',
        style: 'default',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => console.log('DELETE RIDE'),
      },
    ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.singleRide}>Single ride</Text>
            <Text style={styles.time}>
              {moment(ride.date).format('HH:mm ')}
            </Text>
            <Text style={styles.date}>
              {moment(ride.date).format('Do MMMM YYYY')}
            </Text>
          </View>
          <TouchableOpacity onPress={onDeletePress}>
            <Ionicon
              name="trash"
              size={32}
              color={colors.red}
              style={styles.moreIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mapWrapper}>
          <RouteMinimap
            stops={[ride.startingLocation, ...ride.stops, ride.destination]}
            hideDetails={past}
          />
        </View>
        <View style={styles.bottomWrapper}>
          <View style={styles.waypoints}>
            <Waypoints
              ride={ride}
              start={parseCoords(ride.startingLocation.coordinates)}
            />
          </View>
          <View style={styles.passengersList}>
            <PassengersList ride={ride} />
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
    paddingVertical: 27,
  },
  topRow: {
    marginBottom: 27,
    marginHorizontal: 16,
    ...sheet.rowCenterSplit,
  },
  singleRide: {
    ...sheet.textSemiBold,
    fontSize: 20,
    color: colors.green,
    marginBottom: 10,
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
  moreIcon: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  mapWrapper: {
    height: 300,
  },
  waypoints: {
    paddingTop: 8,
    paddingBottom: 16,
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
