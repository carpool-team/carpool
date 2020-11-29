import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {multiPoint} from '@turf/helpers';
import bbox from '@turf/bbox';
import {activeRouteStyle, colors, sheet} from '../../styles';
import {useGetDirections} from '../../hooks';
import {BlueMarker} from '../common/map';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MAP_LIGHT} from '@env';

const dirConfig = {
  profile: 'driving',
  overview: 'full',
  geometries: 'geojson',
};

const getBounds = routesArray => {
  const allCoords = routesArray.map(rt => rt.geometry.coordinates).flat(1);
  const allPoints = multiPoint(allCoords);
  const boundingBox = bbox(allPoints);
  const [ne1, ne2, sw1, sw2] = boundingBox;

  return {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 30,
    paddingBottom: 30,
    ne: [ne1, ne2],
    sw: [sw1, sw2],
  };
};

const parseCoords = coords => {
  return [coords.longitude, coords.latitude];
};

const RouteMinimap = ({stops}) => {
  const [routes, setRoutes] = useState([]);
  const [bounds, setBounds] = useState(null);

  // Directions
  const [results, loading, error, _getDirections] = useGetDirections({
    ...dirConfig,
  });

  useEffect(() => {
    if (stops.length) {
      _getDirections(stops.map(stop => parseCoords(stop.coordinates)));
    }
  }, [stops]);

  useEffect(() => {
    if (routes.length) {
      const bds = getBounds(routes);
      setBounds(bds);
    }
  }, [routes]);

  useEffect(() => {
    if (results) {
      setRoutes(results.body.routes);
    }
  }, [results]);

  const renderPoints = () => {
    if (routes.length) {
      const {waypoints} = results.body;
      const start = waypoints[0];
      const finish = waypoints[waypoints.length - 1];

      let stopPoints = [];

      if (waypoints.length > 2) {
        stopPoints = waypoints.slice(1, waypoints.length - 1);
      }

      return (
        <>
          <MapboxGL.PointAnnotation
            key={start.location.toString()}
            id="selected"
            coordinate={start.location}>
            <BlueMarker size={20} />
          </MapboxGL.PointAnnotation>
          <MapboxGL.PointAnnotation
            key={finish.location.toString()}
            id="selected"
            coordinate={finish.location}>
            <Icon
              name="map-marker"
              color={colors.green}
              size={32}
              style={styles.marker}
            />
          </MapboxGL.PointAnnotation>
          {!!stopPoints.length &&
            stopPoints.map(stop => (
              <MapboxGL.PointAnnotation
                key={stop.location.toString()}
                id="selected"
                coordinate={stop.location}>
                <Icon
                  name="map-marker"
                  color={colors.orange}
                  size={32}
                  style={styles.marker}
                />
              </MapboxGL.PointAnnotation>
            ))}
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
      const {distance, duration} = routes[0];

      return (
        <View style={styles.routeDetailsWrapper}>
          {renderDistance(distance)}
          {renderTime(duration)}
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderRouteDetails()}
      <MapboxGL.MapView
        style={{flex: 1}}
        styleURL={MAP_LIGHT}
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
    bottom: 90,
  },
  routeDetailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  time: {
    ...sheet.textSemiBold,
    fontSize: 32,
    color: colors.green,
  },
  timeUnit: {
    ...sheet.textSemiBold,
    fontSize: 32,
    color: colors.green,
  },
  distance: {
    ...sheet.textSemiBold,
    fontSize: 32,
    color: colors.orange,
  },
  distanceUnit: {
    ...sheet.textSemiBold,
    fontSize: 32,
    color: colors.orange,
  },
  marker: {
    marginBottom: 32,
  },
});

export default RouteMinimap;
