import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {colors, sheet} from '../../../styles';
import {RouteMinimap} from '../../../components/Route';
import {parseCoords} from '../../../utils/coords';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {UpView} from '../../../components/common';
import {Marker} from '../../../components/common/map';
import {Waypoints} from '../../../components/Ride';

const DriversRideDetails = ({navigation, route}) => {
  const {ride} = route.params;

  const date = new Date(ride.date).setSeconds(0, 0);
  const dt = new Date(date).toLocaleString();

  console.log(ride);

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
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.singleRide}>Single ride</Text>
            <Text style={styles.date}>{dt}</Text>
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
  date: {
    ...sheet.textMedium,
    fontSize: 16,
    color: colors.grayDark,
  },
  moreIcon: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  mapWrapper: {
    height: 450,
  },
  bottomWrapper: {
    flex: 1,
    paddingTop: 27,
    paddingHorizontal: 16,
  },
  bottomRow: {
    ...sheet.rowCenterSplit,
    marginTop: 27,
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
