import React, {useState, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import {colors} from '../../../styles';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {RouteInfoSheet, RouteTopSheet} from '../../../components/FindRoute';
import {multiPoint} from '@turf/helpers';
import bbox from '@turf/bbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MAP_LIGHT} from '@env';

const getBounds = routesArray => {
  const allCoords = routesArray.map(rt => rt.geometry.coordinates).flat(1);
  const allPoints = multiPoint(allCoords);
  const boundingBox = bbox(allPoints);
  const [ne1, ne2, sw1, sw2] = boundingBox;

  return {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 160,
    paddingBottom: 160,
    ne: [ne1, ne2],
    sw: [sw1, sw2],
  };
};

const activeStyle = {
  lineColor: colors.blue,
  lineWidth: 6,
  lineCap: 'round',
};
const inactiveStyle = {
  lineColor: colors.gray,
  lineWidth: 6,
  lineCap: 'round',
};

const ShowRoute = props => {
  const [activeRoute, setActiveRoute] = useState(0);
  const [bounds, setBounds] = useState(null);
  const {routes, start, destination} = props.route.params;

  const finishCoords = routes[activeRoute].geometry.coordinates.slice(-1)[0];

  useEffect(() => {
    const bds = getBounds(routes);
    setBounds(bds);
  }, []);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <View style={{flex: 1}}>
          <RouteTopSheet start={start} destination={destination} />
          <MapboxGL.MapView
            style={{flex: 1}}
            onPress={event => console.log(event)}
            styleURL={MAP_LIGHT}
            contentInset={10}>
            <MapboxGL.Camera
              maxZoomLevel={19}
              animationMode="flyTo"
              animationDuration={0}
              bounds={bounds ? bounds : undefined}
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
              <Icon
                name="map-marker"
                color={colors.green}
                size={32}
                style={{marginBottom: 32}}
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
