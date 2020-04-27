import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import colors from '../../../styles/colors';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {vw} from '../../../utils/constants';
import {useNavigation} from '@react-navigation/core';
import RouteInfoSheet from '../../../components/FindRoute/RouteInfoSheet';
import RouteTopSheet from '../../../components/FindRoute/RouteTopSheet';

const ShowRoute = props => {
  const [coordinates, setCoordinates] = useState([16, 879392, 52, 445182]);

  const {route, start, destination} = props.route.params;

  console.log(route);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <View style={{flex: 1}}>
          <RouteTopSheet start={start} destination={destination} />
          <MapboxGL.MapView
            style={{flex: 1}}
            onPress={event => console.log(event)}
            styleURL="mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft">
            <MapboxGL.Camera
              zoomLevel={16}
              animationMode="flyTo"
              animationDuration={0}
              followUserLocation
              followUserMode={'normal'}
            />
            <MapboxGL.UserLocation />
            <MapboxGL.ShapeSource id="route" shape={route.geometry}>
              <MapboxGL.LineLayer
                id="route"
                style={{
                  lineColor: colors.blue,
                  lineWidth: 1.5 * vw,
                  lineCap: 'round',
                }}
              />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
      <RouteInfoSheet route={route} />
    </View>
  );
};

export default ShowRoute;
