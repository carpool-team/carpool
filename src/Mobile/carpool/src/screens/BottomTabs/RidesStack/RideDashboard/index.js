import React, {useEffect, useState, useRef} from 'react';
import {View, Alert, SafeAreaView, TouchableOpacity} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GoBack, Header} from '../../../../components/navigation';
import {parseCoords} from '../../../../utils/coords';
import {sortStops} from '../../../../utils/sortStops';
import {directionsClient} from '../../../../maps/mapbox';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAP_LIGHT} from '@env';
import {FullScreenLoading} from '../../../../components/common/loaders';
import {activeRouteStyle, colors} from '../../../../styles';
import pointToLineDistance from '@turf/point-to-line-distance';
import {point, lineString} from '@turf/helpers';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import lineSlice from '@turf/line-slice';
import length from '@turf/length';
import {styles} from './index.styles';
import {NEW_ROUTE_THERESHOLD, NEXT_STEP_THERESHOLD, dirConfig} from './utils';
import DashboardHeader from '../../../../components/Driver/DashboardHeader';
import DashboardFooter from '../../../../components/Driver/DashboardFooter';

const RideDashboard = props => {
  const {navigation} = props;
  const {ride} = props.route.params;

  const [location, setLocation] = useState(null);
  const [stops, setStops] = useState(null);
  const [waypoints, setWaypoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [route, setRoute] = useState(null);
  const [distance, setDistance] = useState(null);
  const [steps, setSteps] = useState(null);
  const [stepDistance, setStepDistance] = useState(null);
  const [destintionDist, setDestintionDist] = useState(null);

  const isReversed = !!ride.rideDirection;

  const _camera = useRef(null);

  useEffect(() => {
    // Custom header config
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
      header: props => <Header {...props} />,
    });

    Geolocation.getCurrentPosition(
      pos => setLocation(parseCoords(pos.coords)),
      err =>
        Alert.alert('Error', err.message, [
          {
            text: 'Ok',
            style: 'default',
            onPress: () => navigation.goBack(),
          },
        ]),
      {
        timeout: 15000,
        // enableHighAccuracy: true,
        maximumAge: 10000,
      },
    );

    // Watch position
    const watchId = Geolocation.watchPosition(
      position => {
        setLocation(parseCoords(position.coords));
      },
      err => {
        Alert.alert('Error', err.message, [
          {
            text: 'Ok',
            style: 'default',
            onPress: () => navigation.goBack(),
          },
        ]);
      },
      {
        enableHighAccuracy: true,
        accuracy: {
          android: 'balanced',
          ios: 'hundredMeters',
        },
        interval: 3000,
        fastestInterval: 3000,
        distanceFilter: 0,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (ride && !stops) {
      // Sort stops
      const {sortedStops, sortedWaypoints} = sortStops(
        ride.location,
        ride.group.location,
        ride.stops,
      );

      let stopsCp = [...sortedStops];
      let waypointsCp = [...sortedWaypoints];

      if (isReversed) {
        stopsCp.reverse();
        waypointsCp.reverse();
      }

      stopsCp.shift();

      setStops(stopsCp.map(item => ({coordinates: item})));
      setWaypoints(waypointsCp);
    }
  }, [ride]);

  useEffect(() => {
    // Initial route fetch
    if (stops && location && !route) {
      fetchRoute();
    }
  }, [stops, location]);

  useEffect(() => {
    if (route && location) {
      // Distance from route itself
      const userLocation = point(location);
      const line = lineString(route.geometry.coordinates);
      const dist = pointToLineDistance(userLocation, line, {units: 'meters'});
      const destination = point(
        line.geometry.coordinates[line.geometry.coordinates.length - 1],
      );
      const toDestSlice = lineSlice(userLocation, destination, line);
      const toDestLength = length(toDestSlice, {units: 'meters'});

      setDistance(Math.trunc(dist));
      setDestintionDist(Math.trunc(toDestLength));
    }
  }, [location, route]);

  useEffect(() => {
    if (location && steps && route) {
      // Distance from next step
      const userLocation = point(location);
      const nextStep = point(steps[0].maneuver.location);
      const line = lineString(route.geometry.coordinates);
      const destination = point(
        line.geometry.coordinates[line.geometry.coordinates.length - 1],
      );

      // Slice from users location to next step
      const toStepSlice = lineSlice(userLocation, nextStep, line);

      // Distance from users location to next step
      const toStepDist = length(toStepSlice, {units: 'meters'});
      setStepDistance(toStepDist);

      const fromStepSlice = lineSlice(nextStep, destination, line);
      const fromLocationSlice = lineSlice(userLocation, destination, line);

      // Distance from next step location to destination
      const fromStepDist = length(fromStepSlice, {units: 'meters'});

      // Distance from users location to destination
      const fromLocationDist = length(fromLocationSlice, {units: 'meters'});

      // Check if step was passed
      if (fromStepDist > fromLocationDist) {
        let stps = [...steps];
        stps.shift();
        setSteps([...stps]);
      }
    }
  }, [location, steps, route]);

  // Remove waypoint if it was passed
  useEffect(() => {
    if (location && waypoints.length && route) {
      // Distance from next step
      const userLocation = point(location);
      const nextWaypoint = point(parseCoords(waypoints[0].location));
      const line = lineString(route.geometry.coordinates);
      const destination = point(
        line.geometry.coordinates[line.geometry.coordinates.length - 1],
      );

      const fromWaypointSlice = lineSlice(nextWaypoint, destination, line);
      const fromLocationSlice = lineSlice(userLocation, destination, line);

      // Distance from next step location to destination
      const fromWaypointDist = length(fromWaypointSlice, {units: 'meters'});

      // Distance from users location to destination
      const fromLocationDist = length(fromLocationSlice, {units: 'meters'});

      // Check if waypoint was passed
      if (fromWaypointDist > fromLocationDist) {
        const wpts = [...waypoints];
        wpts.shift();
        setWaypoints([...wpts]);
      }
    }
  }, [location, waypoints, route]);

  useEffect(() => {
    // Fetch new route if user fot too far from current one
    if (distance) {
      if (distance > NEW_ROUTE_THERESHOLD) {
        fetchRoute();
      }
    }
  }, [distance]);

  useEffect(() => {
    // Adjust camera to location
    if (_camera.current) {
      _camera.current.moveTo(location, 500);
    }
  }, [location, _camera]);

  const fetchRoute = () => {
    const points = [
      {
        coordinates: location,
      },
      ...waypoints.map(item => ({
        coordinates: parseCoords(item.location),
        waypointName: `${item.participant.firstName} ${
          item.participant.lastName
        }`,
      })),
      {
        coordinates: parseCoords(stops[stops.length - 1].coordinates),
      },
    ];

    setLoading(true);
    directionsClient
      .getDirections({
        ...dirConfig,
        waypoints: points,
      })
      .send()
      .then(res => {
        setRoute(res.body.routes[0]);
        setSteps(res.body.routes[0].legs.map(item => item.steps).flat(1));
      })
      .catch(err => {
        Alert.alert(
          'Error!',
          'An error occured when trying to fetch route. Please try again.',
          [
            {
              text: 'Ok',
              style: 'destructive',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      })
      .finally(() => setLoading(false));
  };

  const renderRoute = () => {
    return route ? (
      <MapboxGL.ShapeSource id="routeShape" shape={route.geometry}>
        <MapboxGL.LineLayer id="routeLayer" style={activeRouteStyle} />
      </MapboxGL.ShapeSource>
    ) : null;
  };

  return loading || !route ? (
    <FullScreenLoading />
  ) : (
    <SafeAreaView style={styles.safeArea}>
      <DashboardHeader
        distance={distance}
        stepDistance={stepDistance}
        steps={steps}
        stops={stops}
      />
      <View style={styles.mapWrapper}>
        <TouchableOpacity onPress={fetchRoute} style={styles.refresh}>
          <FAIcon name="refresh" size={32} color={colors.orange} />
        </TouchableOpacity>
        <MapboxGL.MapView
          style={{flex: 1}}
          styleURL={MAP_LIGHT}
          compassEnabled={false}>
          <MapboxGL.Camera
            defaultSettings={{
              centerCoordinate: location,
              zoomLevel: 14,
            }}
            zoomLevel={14}
            maxZoomLevel={14}
            ref={el => (_camera.current = el)}
          />
          <MapboxGL.UserLocation animated showsUserHeadingIndicator />
          {renderRoute()}
        </MapboxGL.MapView>
      </View>
      <DashboardFooter
        destination={stops[stops.length - 1]}
        distance={destintionDist}
      />
    </SafeAreaView>
  );
};

export default RideDashboard;
