import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAP_LIGHT} from '@env';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../styles';

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
        zoomLevel={14}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  map: {
    flex: 1,
  },
  marker: {
    marginBottom: 17.5,
  },
});

export default PointMinimap;
