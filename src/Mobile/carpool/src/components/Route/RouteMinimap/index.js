import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Alert, Text, StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import bbox from '@turf/bbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MAP_LIGHT} from '@env';
import {colors, activeRouteStyle, sheet} from '../../../styles';
import {BlueMarker} from '../../common/map';
import {directionsClient} from '../../../maps/mapbox';
import {styles} from './index.styles';
import moment from 'moment';

const dirConfig = {
  profile: 'driving',
  overview: 'full',
  geometries: 'geojson',
};

const getBounds = route => {
  const boundingBox = bbox(route.geometry);
  const [ne1, ne2, sw1, sw2] = boundingBox;

  return {
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 32,
    paddingBottom: 32,
    ne: [ne1, ne2],
    sw: [sw1, sw2],
  };
};

const parseCoords = coords => {
  return [coords.longitude, coords.latitude];
};

const RouteMinimap = ({stops, showDetails = false}) => {
  const [route, setRoute] = useState(null);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    if (stops.length) {
      const waypoints = stops.map(stop => ({
        coordinates: parseCoords(stop.coordinates),
      }));

      setLoading(true);
      directionsClient
        .getDirections({
          ...dirConfig,
          waypoints,
        })
        .send()
        .then(res => {
          setResults(res);
          setRoute(res.body.routes[0]);
          setBounds(getBounds(res.body.routes[0]));
        })
        .catch(err => {
          Alert.alert(
            'Error!',
            'An error occured when trying to load route. Pleasy try again',
            [
              {
                text: 'Cancel',
                style: 'destructive',
              },
            ],
          );
        })
        .finally(() => setLoading(false));
    }
  }, [stops]);

  const renderPoints = () => {
    if (route) {
      const {waypoints} = results.body;
      const start = waypoints[0];
      const finish = waypoints[waypoints.length - 1];

      let stopPoints = [];

      if (waypoints.length > 2) {
        stopPoints = waypoints.slice(1, waypoints.length - 1);
      }

      return (
        <>
          <MapboxGL.PointAnnotation id="startPoint" coordinate={start.location}>
            <BlueMarker size={20} />
          </MapboxGL.PointAnnotation>
          <MapboxGL.PointAnnotation
            id="finishPoint"
            coordinate={finish.location}>
            <Icon
              name="map-marker"
              color={colors.green}
              size={32}
              style={styles.marker}
            />
          </MapboxGL.PointAnnotation>
          {!!stopPoints.length &&
            stopPoints.map((stop, index) => (
              <MapboxGL.PointAnnotation
                key={stop.location.toString()}
                id={`stop${index}`}
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

  const renderRoutes = () => {
    return route ? (
      <MapboxGL.ShapeSource id="routeShape" shape={route.geometry}>
        <MapboxGL.LineLayer id="routeLayer" style={activeRouteStyle} />
      </MapboxGL.ShapeSource>
    ) : null;
  };

  return loading || !route ? (
    <View style={styles.centered}>
      <ActivityIndicator color={colors.blue} size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      {showDetails && (
        <View style={styles.detailsWrapper}>
          <Text style={styles.distance}>{`${(route.distance / 1000).toFixed(
            1,
          )} km`}</Text>
          <Text style={styles.time}>
            {moment
              .utc(moment.duration(route.duration, 'seconds').asMilliseconds())
              .format('H [hrs] mm [min]')}
          </Text>
        </View>
      )}
      <MapboxGL.MapView
        style={{flex: 1}}
        styleURL={MAP_LIGHT}
        compassEnabled={false}
        scrollEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}>
        <MapboxGL.Camera
          maxZoomLevel={19}
          animationMode="flyTo"
          animationDuration={1000}
          bounds={bounds ? bounds : undefined}
        />
        {renderRoutes()}
        {renderPoints()}
      </MapboxGL.MapView>
    </View>
  );
};

export default RouteMinimap;
