import React from 'react';
import {View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAP_LIGHT} from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../styles';
import {styles} from './index.styles';

const PointMinimap = ({coordinates}) => (
  <View style={styles.container}>
    <MapboxGL.MapView
      style={styles.map}
      styleURL={MAP_LIGHT}
      compassEnabled={false}
      scrollEnabled={false}
      pitchEnabled={false}
      rotateEnabled={false}>
      <MapboxGL.Camera
        zoomLevel={10}
        animationMode="flyTo"
        animationDuration={1000}
        centerCoordinate={coordinates}
      />
      <MapboxGL.PointAnnotation id="selectedPoint" coordinate={coordinates}>
        <Icon
          name="map-marker"
          color={colors.blue}
          size={35}
          style={styles.marker}
        />
      </MapboxGL.PointAnnotation>
    </MapboxGL.MapView>
  </View>
);

export default PointMinimap;
