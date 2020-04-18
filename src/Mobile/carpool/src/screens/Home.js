import React, {useState} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {SafeAreaView} from 'react-native';

const Home = () => {
  const [coordinates, setCoordinates] = useState([[16.9057, 52.4167]]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapboxGL.MapView style={{flex: 1}} onPress={event => console.log(event)}>
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={coordinates[0]}
          animationMode="flyTo"
          animationDuration={0}
        />
        <MapboxGL.PointAnnotation id="point" coordinate={coordinates[0]} />
      </MapboxGL.MapView>
    </SafeAreaView>
  );
};

export default Home;
