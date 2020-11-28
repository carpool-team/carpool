import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {colors, activeRouteStyle, inactiveRouteStyle} from '../../styles';
import {Marker} from '../../components/common/map';
import {getBoundsForRoutes} from '../../utils/bounds';
import {RouteInfoSheet} from '../../components/FindRoute';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/core';
import {CircleButton} from '../../components/common/buttons';
import {parseCoords} from '../../utils/coords';
import {getColor} from '../../utils/getColor';
import config from '../../../config';
import {useGetDirections} from '../../hooks';
import {useSelector} from 'react-redux';
import {RideInfoSheet} from '../../components/Ride';

const dirConfig = {
  profile: 'walking',
  overview: 'full',
  geometries: 'geojson',
  alternatives: true,
};

const PassengerMap = ({coordinates, _onLocateUser}) => {
  const [center, setCenter] = useState([]);
  const [ride, setRide] = useState(null);
  const [visible, setVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [activeRoute, setActiveRoute] = useState(0);

  // Store
  const allRides = useSelector(state => state.passengerReducer.allRides);

  // Directions
  const [results, loading, error, _getDirections] = useGetDirections(dirConfig);

  const _passengerMap = useRef(null);
  const _passengerCamera = useRef(null);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    return () => onCleanState();
  }, []);

  useEffect(() => {
    if (!center.length) {
      setCenter(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    if (route.params) {
      if (route.params.ride) {
        const {ride} = route.params;
        _onShow();
        setRide(ride);
        setCenter(parseCoords(ride.startingLocation.coordinates));
      }
    }
  }, [route]);

  useEffect(() => {
    if (routes.length) {
      _onHide();
      const bds = getBoundsForRoutes(routes);
      setBounds({
        ...bds,
        paddingTop: 180,
        paddingBottom: 180,
        paddingLeft: 80,
        paddingRight: 80,
      });
    }
  }, [routes]);

  const _onShow = () => {
    setVisible(true);
  };

  const _onHide = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (results) {
      setRoutes(results.body.routes);
    }
  }, [results]);

  const onShowWay = async () => {
    if (ride) {
      _getDirections([
        coordinates,
        parseCoords(ride.startingLocation.coordinates),
      ]);
    }
  };

  const onSelected = ride => {
    _onShow();
    setCenter(parseCoords(ride.startingLocation.coordinates));
    setRide(ride);
  };

  const onCleanState = () => {
    _onHide();
    setRide(null);
    setCenter(coordinates);
    setBounds(null);
    setRoutes([]);
  };

  const renderPassengerPoints = () => {
    if (allRides.data) {
      return allRides.data.length
        ? allRides.data.map(ride => (
            <MapboxGL.PointAnnotation
              key={ride.id}
              id="selected"
              coordinate={parseCoords(ride.startingLocation.coordinates)}
              onSelected={() => onSelected(ride)}
              onDeselected={onCleanState}>
              <Marker
                color={getColor(ride.date)}
                size={24}
                style={styles.marker}
              />
            </MapboxGL.PointAnnotation>
          ))
        : null;
    }
    return null;
  };

  const renderRoutes = () => {
    return routes.length
      ? routes.map((item, index) => (
          <MapboxGL.ShapeSource
            key={index}
            id={`route${index}`}
            shape={item.geometry}
            onPress={() => setActiveRoute(index)}>
            <MapboxGL.LineLayer
              id={`route${index}`}
              style={
                index === activeRoute ? activeRouteStyle : inactiveRouteStyle
              }
              layerIndex={index === activeRoute ? 40 : 30}
            />
          </MapboxGL.ShapeSource>
        ))
      : null;
  };

  return (
    <>
      <MapboxGL.MapView
        ref={_passengerMap}
        style={{flex: 1}}
        styleURL={config.mapLight}
        contentInset={10}
        compassEnabled={false}
        rotateEnabled={false}
        // onPress={console.log}
        onPress={onCleanState}>
        <MapboxGL.Camera
          ref={_passengerCamera}
          zoomLevel={14}
          maxZoomLevel={19}
          animationMode="flyTo"
          animationDuration={500}
          centerCoordinate={
            !center.length
              ? undefined
              : bounds
              ? undefined
              : [center[0], center[1] - 0.0015]
          }
          bounds={bounds ? bounds : undefined}
        />
        <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
        {renderPassengerPoints()}
        {renderRoutes()}
      </MapboxGL.MapView>
      <RideInfoSheet
        visible={visible}
        ride={ride}
        userLocation={coordinates}
        onShowWay={onShowWay}
        onClose={onCleanState}
      />
      {!visible && routes.length ? (
        <RouteInfoSheet route={routes[activeRoute]} onGoBack={onCleanState} />
      ) : null}
      {ride || visible ? null : (
        <CircleButton
          style={{position: 'absolute', bottom: 72, right: 20}}
          onPress={() => navigation.navigate('FindRide')}
          icon={<Icon name="search" color={colors.grayDark} size={24} />}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  marker: {
    marginTop: -24,
    padding: 10,
  },
  button: {
    height: 64,
    width: 64,
    position: 'absolute',
    bottom: 72,
    right: 20,
  },
});

export default PassengerMap;
