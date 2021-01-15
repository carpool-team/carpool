import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAP_LIGHT} from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../styles';
import {styles} from './index.styles';
import Geolocation from 'react-native-geolocation-service';
import {parseCoords} from '../../../utils/coords';
import bbox from '@turf/bbox';
import {multiPoint} from '@turf/helpers';
import {FullScreenLoading} from '../../common/loaders';
import {useNavigation} from '@react-navigation/native';

const getBounds = (point1, point2) => {
  const points = multiPoint([point1, point2]);
  const box = bbox(points);
  const [ne1, ne2, sw1, sw2] = box;

  return {
    paddingLeft: 75,
    paddingRight: 75,
    paddingTop: 75,
    paddingBottom: 75,
    ne: [ne1, ne2],
    sw: [sw1, sw2],
  };
};

const PointMinimap = ({coordinates}) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bounds, setBounds] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => setLocation(parseCoords(pos.coords)),
      err =>
        Alert.alert('Error', err.message, [
          {
            text: 'Ok',
            style: 'default',
            onPress: () => navigation.goBack(),
          },
        ]),
      {
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  useEffect(() => {
    if (location && coordinates) {
      setBounds(getBounds(location, coordinates));
    }
  }, [location, coordinates]);

  useEffect(() => {
    if (bounds) {
      setLoading(false);
    }
  }, [bounds]);

  return loading ? (
    <FullScreenLoading />
  ) : (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MAP_LIGHT}
        compassEnabled={false}>
        <MapboxGL.Camera
          maxZoomLevel={18}
          animationMode="flyTo"
          animationDuration={1000}
          bounds={bounds}
        />
        <MapboxGL.UserLocation />
        <MapboxGL.PointAnnotation id="selectedPoint" coordinate={coordinates}>
          <Icon
            name="map-marker"
            color={colors.green}
            size={35}
            style={styles.marker}
          />
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </View>
  );
};

export default PointMinimap;
