import React, {useState, useEffect} from 'react';
import {View, SafeAreaView} from 'react-native';
import {colors} from '../../../styles';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {vw, vh} from '../../../utils/constants';
import {RouteInfoSheet, RouteTopSheet} from '../../../components/FindRoute';
import {Marker} from '../../../components/common';
import {multiPoint} from '@turf/helpers';
import bbox from '@turf/bbox';
import config from '../../../../config';

const getBounds = routesArray => {
  const allCoords = routesArray.map(rt => rt.geometry.coordinates).flat(1);
  const allPoints = multiPoint(allCoords);
  const boundingBox = bbox(allPoints);
  const [ne1, ne2, sw1, sw2] = boundingBox;

  return {
    paddingLeft: 8 * vw,
    paddingRight: 8 * vw,
    paddingTop: 18 * vh,
    paddingBottom: 18 * vh,
    ne: [ne1, ne2],
    sw: [sw1, sw2],
  };
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
            styleURL={config.mapLight}
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
