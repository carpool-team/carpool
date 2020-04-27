import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import colors from '../../../styles/colors';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {vw, vh} from '../../../utils/constants';
import RouteInfoSheet from '../../../components/FindRoute/RouteInfoSheet';
import RouteTopSheet from '../../../components/FindRoute/RouteTopSheet';
import Marker from '../../../components/common/Marker';

const ShowRoute = props => {
  const [activeRoute, setActiveRoute] = useState(0);

  const {routes, start, destination} = props.route.params;

  const startCoords = routes[activeRoute].geometry.coordinates[0];
  const finishCoords = routes[activeRoute].geometry.coordinates.slice(-1)[0];

  const bounds = {
    paddingLeft: 8 * vw,
    paddingRight: 8 * vw,
    paddingTop: 18 * vh,
    paddingBottom: 18 * vh,
    ne: startCoords,
    sw: finishCoords,
  };

  const activeStyle = {
    lineColor: colors.blue,
    lineWidth: 1.5 * vw,
    lineCap: 'round',
  };
  const inactiveStyle = {
    lineColor: colors.gray,
    lineWidth: 1.5 * vw,
    lineCap: 'round',
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
            {routes.map((item, index) => (
              <MapboxGL.ShapeSource
                key={index}
                id={`route${index}`}
                shape={item.geometry}
                onPress={() => setActiveRoute(index)}>
                <MapboxGL.LineLayer
                  id={`route${index}`}
                  style={index === activeRoute ? activeStyle : inactiveStyle}
                  layerIndex={index === activeRoute ? 40 : 30}
                />
              </MapboxGL.ShapeSource>
            ))}
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
      <RouteInfoSheet route={routes[activeRoute]} />
    </View>
  );
};

export default ShowRoute;
