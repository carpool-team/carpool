import React, {useState, useEffect} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import HamburgerMenu from '../components/navigation/HamburgerMenu';
import AccountSwitch from '../components/navigation/AccountSwitch';
import Marker from '../components/common/Marker';
import {vw} from '../utils/constants';
import {examplePassengerPoints} from '../examples/points';

const getColor = time => {
  if (time < 20) {
    return colors.red;
  } else {
    if (time < 45) {
      return colors.orange;
    } else {
      if (time < 90) {
        return colors.yellow;
      } else {
        return colors.green;
      }
    }
  }
};

const Home = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState([]);

  const _onLocateUser = e => {
    if (e) {
      const {
        coords: {latitude, longitude},
      } = e;
      setCoordinates([longitude, latitude]);
    }
  };

  useEffect(() => {
    if (!center.length) {
      setCenter(coordinates);
    }
  }, [coordinates]);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <View style={{flex: 1}}>
          <HamburgerMenu />
          <AccountSwitch />
          <MapboxGL.MapView
            style={{flex: 1}}
            styleURL="mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft">
            <MapboxGL.Camera
              zoomLevel={14}
              animationMode="flyTo"
              animationDuration={500}
              //followUserLocation={!center.length}
              //followUserMode={'normal'}
              centerCoordinate={center}
            />
            <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
            {examplePassengerPoints.map(point => (
              <MapboxGL.PointAnnotation
                key={point.id}
                id="selected"
                coordinate={point.coordinates}
                onSelected={e => setCenter(point.coordinates)}
                onDeselected={() => setCenter(coordinates)}>
                <Marker
                  color={getColor(point.timeLeft)}
                  size={6 * vw}
                  style={{
                    marginTop: -6 * vw,
                    padding: 2 * vw,
                  }}
                />
              </MapboxGL.PointAnnotation>
            ))}
          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
