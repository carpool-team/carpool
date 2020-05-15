import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {vw, vh} from '../../../utils/constants';
import sheet from '../../../styles/sheet';
import colors from '../../../styles/colors';
import UpView from '../../../components/common/UpView';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Marker from '../../../components/common/Marker';

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
            style={{...styles.name, paddingHorizontal: 4 * vw}}
            numberOfLines={1}>
            {group.name}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcon
              name="chevron-left"
              size={10 * vw}
              color={colors.grayVeryDark}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.statsRow}>
          <View style={sheet.columnCenter}>
            <Text style={styles.totalRides}>{group.totalRides}</Text>
            <Text style={styles.rides}>total rides</Text>
          </View>
          <View style={sheet.columnCenter}>
            <Text style={styles.totalMembers}>{group.members}</Text>
            <Text style={styles.members}>members</Text>
          </View>
          <View style={sheet.columnCenter}>
            <Text style={styles.totalDistance}>{group.totalDistance}</Text>
            <Text style={styles.distance}>kilometers</Text>
          </View>
        </View>
        <View style={styles.cardGrid}>
          <UpView
            borderRadius={2 * vw}
            style={{width: 42 * vw, height: 15 * vh}}
            onPress={() => null}>
            <View style={styles.cardContent}>
              <MaterialIcon name="group" size={10 * vw} color={colors.blue} />
              <Text style={styles.cardLabel}>Members</Text>
            </View>
          </UpView>
          <UpView
            borderRadius={2 * vw}
            style={{width: 42 * vw, height: 15 * vh}}
            onPress={() => null}>
            <View style={styles.cardContent}>
              <MaterialIcon
                name="settings"
                size={10 * vw}
                color={colors.blue}
              />
              <Text style={styles.cardLabel}>Settings</Text>
            </View>
          </UpView>
          <UpView
            borderRadius={2 * vw}
            style={{width: 42 * vw, height: 15 * vh}}
            onPress={() => null}>
            <View style={styles.cardContent}>
              <Ionicon name="ios-car" size={10 * vw} color={colors.blue} />
              <Text style={styles.cardLabel}>Your rides</Text>
            </View>
          </UpView>
          <UpView
            borderRadius={2 * vw}
            style={{width: 42 * vw, height: 15 * vh}}
            onPress={() => null}>
            <View style={styles.cardContent}>
              <MaterialIcon name="search" size={10 * vw} color={colors.blue} />
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
            styleURL="mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft"
            contentInset={10}
            compassEnabled={false}
            //zoomEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}>
            <MapboxGL.Camera
              zoomLevel={14}
              maxZoomLevel={19}
              animationMode="flyTo"
              animationDuration={500}
              centerCoordinate={group.coordinates}
            />
            <MapboxGL.PointAnnotation
              key={group.coordinates.toString()}
              id="selected"
              coordinate={group.coordinates}>
              <Marker color={colors.green} size={6 * vw} />
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
    paddingTop: 2 * vh,
  },
  name: {
    ...sheet.textBold,
    color: colors.grayDark,
    fontSize: 8 * vw,
  },
  statsRow: {
    ...sheet.rowCenterSplit,
    marginTop: 2 * vh,
    paddingHorizontal: 4 * vw,
  },
  totalRides: {
    ...sheet.textBold,
    color: colors.green,
    fontSize: 10 * vw,
  },
  rides: {
    ...sheet.textBold,
    color: colors.green,
    fontSize: 4.5 * vw,
  },
  totalMembers: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 10 * vw,
  },
  members: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 4.5 * vw,
  },
  totalDistance: {
    ...sheet.textBold,
    color: colors.orange,
    fontSize: 10 * vw,
  },
  distance: {
    ...sheet.textBold,
    color: colors.orange,
    fontSize: 4.5 * vw,
  },
  cardGrid: {
    marginTop: 3 * vh,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    height: 34 * vh,
    paddingHorizontal: 4 * vw,
    marginBottom: 3 * vh,
  },
  cardContent: {
    flex: 1,
    padding: 4 * vw,
    justifyContent: 'space-between',
  },
  cardLabel: {
    ...sheet.textSemiBold,
    //color: colors.blue,
    color: colors.grayDark,
    fontSize: 5 * vw,
  },
});

export default GroupDetails;
