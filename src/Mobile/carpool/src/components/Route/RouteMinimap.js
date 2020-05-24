import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {directionsClient} from '../../maps/mapbox';
import MapboxGL from '@react-native-mapbox-gl/maps';
import config from '../../../config';
import {multiPoint} from '@turf/helpers';
import bbox from '@turf/bbox';
import {vw, vh} from '../../utils/constants';
import {activeRouteStyle, colors, sheet} from '../../styles';
import {Marker, BlueMarker} from '../common';

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

const RouteMinimap = ({start, destination}) => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    if (start && destination) {
      onGetRoutes(
        parseCoords(start.coordinates),
        parseCoords(destination.coordinates),
      );
    }
  }, [start, destination]);

  useEffect(() => {
    if (routes.length) {
      const bds = getBounds(routes);
      setBounds(bds);
    }
  }, [routes]);

  const parseCoords = coords => {
    return [coords.latitude, coords.longitude];
  };

  const onGetRoutes = async (startCoords, finishCoords) => {
    try {
      setLoading(true);
      const response = await directionsClient
        .getDirections({
          profile: 'driving',
          waypoints: [
            {
              coordinates: startCoords,
            },
            {
              coordinates: finishCoords,
            },
          ],
          overview: 'full',
          geometries: 'geojson',
        })
        .send();

      setRoutes(response.body.routes);
    } catch (err) {
      console.log('ERROR', err);
    } finally {
      setLoading(false);
    }
  };

  const renderPoints = () => {
    if (routes.length) {
      const {coordinates} = routes[0].geometry;
      const start = coordinates[0];
      const finish = coordinates[coordinates.length - 1];

      return (
        <>
          <MapboxGL.PointAnnotation
            key={start.toString()}
            id="selected"
            coordinate={start}>
            <BlueMarker size={5 * vw} />
          </MapboxGL.PointAnnotation>
          <MapboxGL.PointAnnotation
            key={finish.toString()}
            id="selected"
            coordinate={finish}>
            <Marker
              color={colors.green}
              size={5 * vw}
              style={{marginTop: -6 * vw}}
            />
          </MapboxGL.PointAnnotation>
        </>
      );
    } else {
      return null;
    }
  };

  const renderRoutes = () =>
    routes.map((item, index) => (
      <MapboxGL.ShapeSource
        key={index}
        id={`route${index}`}
        shape={item.geometry}>
        <MapboxGL.LineLayer
          id={`route${index}`}
          style={activeRouteStyle}
          layerIndex={40}
        />
      </MapboxGL.ShapeSource>
    ));

  const renderTime = duration => {
    const minutes = Math.round(duration / 60);
    const hours = (minutes - (minutes % 60)) / 60;
    const extraMinutes = minutes % 60;

    return minutes > 60 ? (
      <Text>
        <Text style={styles.time}>{hours}</Text>
        <Text style={styles.timeUnit}>h </Text>
        <Text style={styles.time}>{extraMinutes}</Text>
        <Text style={styles.timeUnit}>min</Text>
      </Text>
    ) : (
      <Text>
        <Text style={styles.time}>{minutes}</Text>
        <Text style={styles.timeUnit}> min</Text>
      </Text>
    );
  };

  const renderDistance = distance => {
    const kilometers = (distance / 1000).toFixed(0);
    const meters = (distance / 1000).toFixed(1) * 1000;

    return kilometers < 1 ? (
      <Text>
        <Text style={styles.distance}>{meters}</Text>
        <Text style={styles.distanceUnit}> m</Text>
      </Text>
    ) : (
      <Text>
        <Text style={styles.distance}>{kilometers}</Text>
        <Text style={styles.distanceUnit}> km</Text>
      </Text>
    );
  };

  const renderRouteDetails = () => {
    if (routes.length) {
      const {duration, distance} = routes[0];

      return (
        <View style={styles.routeDetailsWrapper}>
          {renderTime(duration)}
          {renderDistance(distance)}
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={{flex: 1}}
        styleURL={config.mapLight}
        contentInset={10}
        compassEnabled={false}
        scrollEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}>
        <MapboxGL.Camera
          maxZoomLevel={19}
          animationMode="flyTo"
          animationDuration={0}
          bounds={bounds ? bounds : undefined}
        />
        {renderRoutes()}
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.orange}
            style={styles.activityIndicator}
          />
        ) : null}
        {renderPoints()}
        {renderRouteDetails()}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  activityIndicator: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 10 * vh,
  },
  routeDetailsWrapper: {
    position: 'absolute',
    top: 1 * vh,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  time: {
    ...sheet.textSemiBold,
    fontSize: 8 * vw,
    color: colors.green,
  },
  timeUnit: {
    ...sheet.textSemiBold,
    fontSize: 5 * vw,
    color: colors.green,
  },
  distance: {
    ...sheet.textSemiBold,
    fontSize: 8 * vw,
    color: colors.orange,
  },
  distanceUnit: {
    ...sheet.textSemiBold,
    fontSize: 5 * vw,
    color: colors.orange,
  },
});

export default RouteMinimap;
