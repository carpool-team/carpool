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
import Icon from 'react-native-vector-icons/FontAwesome';
import {RouteMinimap} from '../../../components/Route';
import {GroupWaypoints} from '../../../components/Ride';
import {GoBack, Header} from '../../../components/navigation';

const PassengersRideDetails = ({navigation, route}) => {
  const {ride, past} = route.params;

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
        onPress: () => console.log('RESIGN RIDE'),
      },
    ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}>
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
              <Icon
                name="trash"
                size={32}
                color={colors.red}
                style={styles.moreIcon}
              />
            </TouchableOpacity>
          )}
        </View>
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
          <GroupWaypoints
            group={ride.group}
            location={{coordinates: ride.location}}
            swap={ride.rideDirection}
          />
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
});

export default PassengersRideDetails;
