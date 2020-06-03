import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colors, sheet} from '../../../styles';
import {vh, vw} from '../../../utils/constants';
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
              size={8 * vw}
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
              borderRadius={2 * vw}>
              <View style={styles.upviewContent}>
                <Ionicon name="md-person" color={colors.blue} size={10 * vw} />
                <Text style={styles.upviewCount}>
                  {ride.participants.length}
                </Text>
              </View>
            </UpView>
            <UpView
              contentContainerStyle={sheet.center}
              style={styles.upView}
              onPress={() => null}
              borderRadius={2 * vw}>
              <View style={styles.upviewContent}>
                <Marker color={colors.blue} size={6 * vw} />
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
    marginHorizontal: 4 * vw,
    ...sheet.rowCenterSplit,
  },
  singleRide: {
    ...sheet.textSemiBold,
    fontSize: 5 * vw,
    color: colors.green,
    marginBottom: 1 * vh,
  },
  date: {
    ...sheet.textMedium,
    fontSize: 4 * vw,
    color: colors.grayDark,
  },
  moreIcon: {
    paddingHorizontal: 4 * vw,
    paddingVertical: 1 * vh,
  },
  mapWrapper: {
    height: 50 * vh,
  },
  bottomWrapper: {
    flex: 1,
    paddingTop: 3 * vh,
    paddingHorizontal: 4 * vw,
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
    padding: 4 * vw,
    ...sheet.rowCenter,
  },
  upviewCount: {
    ...sheet.textSemiBold,
    fontSize: 7 * vw,
    color: colors.grayDark,
    marginLeft: 4 * vw,
  },
});

export default DriversRideDetails;
