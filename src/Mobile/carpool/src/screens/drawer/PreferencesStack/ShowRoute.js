import React from 'react';
import {View, SafeAreaView} from 'react-native';
import colors from '../../../styles/colors';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {vw, vh} from '../../../utils/constants';
import RouteInfoSheet from '../../../components/FindRoute/RouteInfoSheet';
import RouteTopSheet from '../../../components/FindRoute/RouteTopSheet';
import Marker from '../../../components/common/Marker';

const ShowRoute = props => {
  const {route, start, destination} = props.route.params;

  const startCoords = route.geometry.coordinates[0];
  const finishCoords = route.geometry.coordinates.slice(-1)[0];

  const bounds = {
    paddingLeft: 8 * vw,
    paddingRight: 8 * vw,
    paddingTop: 16 * vh,
    paddingBottom: 16 * vh,
    ne: startCoords,
    sw: finishCoords,
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <View style={{flex: 1}}>
          <RouteTopSheet start={start} destination={destination} />
          <MapboxGL.MapView
            style={{flex: 1}}
            onPress={event => console.log(event)}
            styleURL="mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft"
            contentInset={10}>
            <MapboxGL.Camera
              maxZoomLevel={19}
              animationMode="flyTo"
              animationDuration={0}
              bounds={bounds}
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
            <MapboxGL.PointAnnotation
              key={finishCoords.toString()}
              id="selected"
              coordinate={finishCoords}>
              <Marker
                color={colors.green}
                size={5 * vw}
                style={{marginTop: -6 * vw}}
              />
            </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
      <RouteInfoSheet route={route} />
    </View>
  );
};

export default ShowRoute;
