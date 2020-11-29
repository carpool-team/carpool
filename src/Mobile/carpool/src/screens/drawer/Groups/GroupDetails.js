import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import sheet from '../../../styles/sheet';
import colors from '../../../styles/colors';
import UpView from '../../../components/common/UpView';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {parseCoords} from '../../../utils/coords';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MAP_LIGHT} from '@env';

const GroupDetails = ({navigation, route}) => {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    if (route.params) {
      setGroup(route.params.group);
    }
  }, []);

  return group ? (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.upperContainer}>
        <View style={sheet.rowCenterSplit}>
          <Text
            style={{...styles.name, paddingHorizontal: 16}}
            numberOfLines={1}>
            {group.name}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcon
              name="chevron-left"
              size={40}
              color={colors.grayVeryDark}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.statsRow}>
          <View style={sheet.columnCenter}>
            <Text style={styles.totalRides}>{group.rideCount}</Text>
            <Text style={styles.rides}>total rides</Text>
          </View>
          <View style={sheet.columnCenter}>
            <Text style={styles.totalMembers}>{group.userCount}</Text>
            <Text style={styles.members}>members</Text>
          </View>
          <View style={sheet.columnCenter}>
            <Text style={styles.totalDistance}>{123}</Text>
            <Text style={styles.distance}>kilometers</Text>
          </View>
        </View>
        <View style={styles.cardGrid}>
          <UpView
            borderRadius={8}
            style={{width: 168, height: 135}}
            onPress={() => null}>
            <View style={styles.cardContent}>
              <MaterialIcon name="group" size={40} color={colors.blue} />
              <Text style={styles.cardLabel}>Members</Text>
            </View>
          </UpView>
          <UpView
            borderRadius={8}
            style={{width: 168, height: 135}}
            onPress={() => null}>
            <View style={styles.cardContent}>
              <MaterialIcon name="settings" size={40} color={colors.blue} />
              <Text style={styles.cardLabel}>Settings</Text>
            </View>
          </UpView>
          <UpView
            borderRadius={8}
            style={{width: 168, height: 135}}
            onPress={() => null}>
            <View style={styles.cardContent}>
              <Ionicon name="ios-car" size={40} color={colors.blue} />
              <Text style={styles.cardLabel}>Your rides</Text>
            </View>
          </UpView>
          <UpView
            borderRadius={8}
            style={{width: 168, height: 135}}
            onPress={() => navigation.navigate('FindRide')}>
            <View style={styles.cardContent}>
              <MaterialIcon name="search" size={40} color={colors.blue} />
              <Text style={styles.cardLabel}>Find a ride</Text>
            </View>
          </UpView>
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <MapboxGL.MapView
            style={{flex: 1}}
            styleURL={MAP_LIGHT}
            contentInset={10}
            compassEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}>
            <MapboxGL.Camera
              zoomLevel={12}
              maxZoomLevel={19}
              animationMode="flyTo"
              animationDuration={500}
              centerCoordinate={parseCoords(group.location)}
            />
            <MapboxGL.PointAnnotation
              key={group.id}
              id="selected"
              coordinate={parseCoords(group.location)}>
              <Icon name="map-marker" color={colors.green} size={35} />
            </MapboxGL.PointAnnotation>
            <MapboxGL.UserLocation visible />
          </MapboxGL.MapView>
        </View>
      </View>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    paddingTop: 18,
  },
  name: {
    ...sheet.textBold,
    color: colors.grayDark,
    fontSize: 32,
  },
  statsRow: {
    ...sheet.rowCenterSplit,
    marginTop: 18,
    paddingHorizontal: 16,
  },
  totalRides: {
    ...sheet.textBold,
    color: colors.green,
    fontSize: 40,
  },
  rides: {
    ...sheet.textBold,
    color: colors.green,
    fontSize: 18,
  },
  totalMembers: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 40,
  },
  members: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 18,
  },
  totalDistance: {
    ...sheet.textBold,
    color: colors.orange,
    fontSize: 40,
  },
  distance: {
    ...sheet.textBold,
    color: colors.orange,
    fontSize: 18,
  },
  cardGrid: {
    marginTop: 27,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    height: 300,
    paddingHorizontal: 16,
    marginBottom: 27,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardLabel: {
    ...sheet.textSemiBold,
    //color: colors.blue,
    color: colors.grayDark,
    fontSize: 20,
  },
});

export default GroupDetails;
