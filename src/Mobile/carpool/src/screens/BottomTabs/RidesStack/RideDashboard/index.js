import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {GoBack, Header} from '../../../../components/navigation';
import {parseCoords} from '../../../../utils/coords';
import {sortStops} from '../../../../utils/sortStops';
import {directionsClient} from '../../../../maps/mapbox';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAP_LIGHT} from '@env';
import {FullScreenLoading} from '../../../../components/common/loaders';
import {activeRouteStyle, sheet, colors} from '../../../../styles';
import pointToLineDistance from '@turf/point-to-line-distance';
import {point, lineString} from '@turf/helpers';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import NextStop from '../../../../components/Driver/NextStop';
import turfDistance from '@turf/distance';
import {styles} from './index.styles';
import {StandardButton} from '../../../../components/common/buttons';
import {
  GO_BACK_THERESHOLD,
  NEW_ROUTE_THERESHOLD,
  NEXT_STEP_THERESHOLD,
  NEXT_STOP_THERESHOLD,
  dirConfig,
  icons,
  parseDistance,
} from './utils';

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
  const [stopDistance, setStopDistance] = useState(null);

  const isReversed = !!ride.rideDirection;

  useEffect(() => {
    // Custom header config
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
      header: props => <Header {...props} hideSwitch />,
    });

    // Watch position
    const watchId = Geolocation.watchPosition(
      position => {
        setLocation(parseCoords(position.coords));
      },
      err => {
        alert('An error ocurred when trying to get location');
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (ride) {
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

      setDistance(dist.toFixed(0));
    }
  }, [location, route]);

  useEffect(() => {
    if (location && steps) {
      // Distance from next step
      const userLocation = point(location);
      const to = point(steps[0].maneuver.location);
      const dist = turfDistance(userLocation, to, {units: 'meters'});

      // If close enough, remove closest step
      if (dist < NEXT_STEP_THERESHOLD && steps.length) {
        let stps = [...steps];
        stps.shift();
        setSteps([...stps]);
      }
    }
  }, [location, steps]);

  useEffect(() => {
    if (location && stops) {
      // Distance from next stop
      const userLocation = point(location);
      const to = point(parseCoords(stops[0].coordinates));
      const dist = turfDistance(userLocation, to, {units: 'meters'});

      // Save distance
      setStopDistance(dist);
    }
  }, [location, stops]);

  useEffect(() => {
    // Fetch new route if user fot too far from current one
    if (distance) {
      if (distance > NEW_ROUTE_THERESHOLD) {
        fetchRoute();
      }
    }
  }, [distance]);

  useEffect(() => {
    // Fetch new route when a stop gets removed
    if (stops && location) {
      fetchRoute();
    }
  }, [stops]);

  const renderRoute = () => {
    return route ? (
      <MapboxGL.ShapeSource id="routeShape" shape={route.geometry}>
        <MapboxGL.LineLayer id="routeLayer" style={activeRouteStyle} />
      </MapboxGL.ShapeSource>
    ) : null;
  };

  const fetchRoute = () => {
    // Check if any points are left
    const points = [
      {
        coordinates: location,
      },
      {
        coordinates: parseCoords(stops[0].coordinates),
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
        setSteps(res.body.routes[0].legs[0].steps);
      })
      .catch(err => {
        Alert.alert('Error!', 'An error occured', [
          {
            text: 'Cancel',
            style: 'destructive',
          },
        ]);
      })
      .finally(() => setLoading(false));
  };

  const renderHeader = () => {
    if (distance > GO_BACK_THERESHOLD) {
      return (
        <View style={sheet.rowCenter}>
          <Ionicon name="warning" color={colors.grayDark} size={24} />
          <Text style={styles.goBack}>Go back to the route!</Text>
        </View>
      );
    }
    if (distance > NEW_ROUTE_THERESHOLD) {
      return (
        <View style={sheet.rowCenter}>
          <ActivityIndicator color={colors.grayDark} size="small" />
          <Text style={styles.fetching}>Fetching new route...</Text>
        </View>
      );
    }

    if (!stops.length) {
      return (
        <View style={sheet.rowCenter}>
          <Text style={styles.success}>
            You have successfully reached your destination!
          </Text>
        </View>
      );
    }

    return (
      <View style={{...sheet.rowCenter, paddingHorizontal: 8}}>
        <Ionicon
          name={
            icons[
              steps[0].maneuver.modifier
                ? steps[0].maneuver.modifier
                : 'default'
            ]
          }
          color={colors.blue}
          size={32}
        />
        <Text style={styles.step}>{steps[0].maneuver.instruction}</Text>
      </View>
    );
  };

  const renderNextStop = () => {
    // Render waypoint if possible
    if (waypoints.length) {
      return <NextStop location={waypoints[0].location} />;
    }

    // Render location if ride direction is reversed
    if (isReversed) {
      return <NextStop location={ride.location} />;
    }

    // Render group
    return (
      <View style={sheet.rowCenter}>
        <FAIcon name="circle" color={colors.orange} size={12} />
        <Text style={styles.groupName}>{ride.group.name}</Text>
      </View>
    );
  };

  const onArrivedPress = () => {
    if (stops.length > 1) {
      // Remove closest stop from array
      let stps = [...stops];
      stps.shift();
      setStops([...stps]);

      // Remove closest waypoint if possible
      const wpts = [...waypoints];
      wpts.shift();
      setWaypoints([...wpts]);
    } else {
      navigation.navigate('Home');
    }
  };

  const renderNextButton = () => {
    if (stopDistance < NEXT_STOP_THERESHOLD) {
      return (
        <View style={styles.buttonWrapper}>
          <StandardButton
            title="Arrived"
            color={colors.green}
            height={40}
            width={150}
            onPress={onArrivedPress}
          />
        </View>
      );
    }
  };

  return loading ? (
    <FullScreenLoading />
  ) : (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>{renderHeader()}</View>
      <View style={styles.mapWrapper}>
        <TouchableOpacity onPress={fetchRoute} style={styles.refresh}>
          <FAIcon name="refresh" size={32} color={colors.orange} />
        </TouchableOpacity>
        <MapboxGL.MapView
          style={{flex: 1}}
          styleURL={MAP_LIGHT}
          compassEnabled={false}>
          <MapboxGL.Camera
            followUserLocation
            followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
            zoomLevel={18}
            animationMode="moveTo"
            // animationDuration={500}
            // centerCoordinate={location}
          />
          <MapboxGL.UserLocation animated showsUserHeadingIndicator />
          {renderRoute()}
        </MapboxGL.MapView>
      </View>
      <View style={styles.footer}>
        <View style={sheet.rowCenterSplit}>
          <Text style={styles.nextStop}>Next stop</Text>
          <Text style={styles.distance}>{parseDistance(stopDistance)}</Text>
        </View>
        {renderNextStop()}
        {renderNextButton()}
      </View>
    </SafeAreaView>
  );
};

export default RideDashboard;
