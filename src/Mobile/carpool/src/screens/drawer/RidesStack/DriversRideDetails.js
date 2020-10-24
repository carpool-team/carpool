import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors, sheet} from '../../../styles';
import {vh} from '../../../utils/constants';
import {RouteMinimap} from '../../../components/Route';
import Waypoints from '../../../components/Ride/Waypoints';
import {parseCoords} from '../../../utils/coords';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {UpView, Marker} from '../../../components/common';

const DriversRideDetails = ({navigation, route}) => {
  const {ride} = route.params;

  const date = new Date(ride.date).setSeconds(0, 0);
  const dt = new Date(date).toLocaleString();

  console.log(ride);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.singleRide}>Single ride</Text>
            <Text style={styles.date}>{dt}</Text>
          </View>
          <TouchableOpacity>
            <Ionicon
              name="md-more"
              size={32}
              color={colors.grayDark}
              style={styles.moreIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mapWrapper}>
          <RouteMinimap
            start={ride.startingLocation}
            destination={ride.destination}
          />
        </View>
        <View style={styles.bottomWrapper}>
          <Waypoints
            ride={ride}
            start={parseCoords(ride.startingLocation.coordinates)}
          />
          <View style={styles.bottomRow}>
            <UpView
              contentContainerStyle={sheet.center}
              style={styles.upView}
              onPress={() => null}
              borderRadius={8}>
              <View style={styles.upviewContent}>
                <Ionicon name="md-person" color={colors.blue} size={40} />
                <Text style={styles.upviewCount}>
                  {ride.participants.length}
                </Text>
              </View>
            </UpView>
            <UpView
              contentContainerStyle={sheet.center}
              style={styles.upView}
              onPress={() => null}
              borderRadius={8}>
              <View style={styles.upviewContent}>
                <Marker color={colors.blue} size={24} />
                <Text style={styles.upviewCount}>{ride.stops.length}</Text>
              </View>
            </UpView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingVertical: 3 * vh,
  },
  topRow: {
    marginBottom: 3 * vh,
    marginHorizontal: 16,
    ...sheet.rowCenterSplit,
  },
  singleRide: {
    ...sheet.textSemiBold,
    fontSize: 20,
    color: colors.green,
    marginBottom: 1 * vh,
  },
  date: {
    ...sheet.textMedium,
    fontSize: 16,
    color: colors.grayDark,
  },
  moreIcon: {
    paddingHorizontal: 16,
    paddingVertical: 1 * vh,
  },
  mapWrapper: {
    height: 50 * vh,
  },
  bottomWrapper: {
    flex: 1,
    paddingTop: 3 * vh,
    paddingHorizontal: 16,
  },
  bottomRow: {
    ...sheet.rowCenterSplit,
    marginTop: 3 * vh,
    flex: 1,
  },
  upView: {
    width: '46%',
  },
  upviewContent: {
    padding: 16,
    ...sheet.rowCenter,
  },
  upviewCount: {
    ...sheet.textSemiBold,
    fontSize: 28,
    color: colors.grayDark,
    marginLeft: 16,
  },
});

export default DriversRideDetails;
