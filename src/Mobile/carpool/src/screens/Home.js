import React, {useState, useEffect, useRef} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {SafeAreaView, View} from 'react-native';
import colors from '../styles/colors';
import HamburgerMenu from '../components/navigation/HamburgerMenu';
import AccountSwitch from '../components/navigation/AccountSwitch';
import Marker from '../components/common/Marker';
import {vw, vh} from '../utils/constants';
import {examplePassengerPoints} from '../examples/points';
import RideInfoSheet from '../components/Ride/RideInfoSheet';
import {AccountContext} from '../context/AccountContext';
import {directionsClient} from '../maps/mapbox';
import {getBoundsForRoutes} from '../utils/bounds';
import {activeRouteStyle, inactiveRouteStyle} from '../styles/map';
import RouteInfoSheet from '../components/FindRoute/RouteInfoSheet';

const getColor = time => {
  if (time < 20) {
    return colors.red;
  } else {
    if (time < 45) {
      return colors.orange;
    } else {
      if (time < 90) {
        return colors.yellow;
      } else {
        return colors.green;
      }
    }
  }
};

const Home = ({navigation, route}) => {
  const {
    accountState: {activeAccount},
  } = React.useContext(AccountContext);

  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState([]);
  const [ride, setRide] = useState(null);
  const [visible, setVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [activeRoute, setActiveRoute] = useState(0);

  const _passengerMap = useRef(null);
  const _driverMap = useRef(null);
  const _passengerCamera = useRef(null);

  useEffect(() => {
    if (!center.length) {
      setCenter(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    if (activeAccount === 'driver' && visible) {
      setCenter(coordinates);
      _onHide();
    }
  }, [activeAccount]);

  useEffect(() => {
    if (route.params) {
      _onShow();
      setRide(route.params.ride);
      setCenter(route.params.ride.coordinates);
    }
  }, [route]);

  useEffect(() => {
    if (routes.length) {
      setVisible(false);
      const bds = getBoundsForRoutes(routes);
      setBounds({
        ...bds,
        paddingTop: 20 * vh,
        paddingBottom: 20 * vh,
      });
    }
  }, [routes]);

  useEffect(() => {
    console.log(bounds);
  }, [bounds]);

  const _onLocateUser = e => {
    if (e) {
      const {
        coords: {latitude, longitude},
      } = e;
      setCoordinates([longitude, latitude]);
    }
  };

  const _onShow = () => {
    setVisible(true);
  };

  const _onHide = () => {
    setVisible(false);
  };

  const onShowWay = async () => {
    if (ride) {
      const response = await directionsClient
        .getDirections({
          profile: 'walking',
          waypoints: [
            {
              coordinates: coordinates,
            },
            {
              coordinates: ride.coordinates,
            },
          ],
          overview: 'full',
          geometries: 'geojson',
          alternatives: true,
        })
        .send();

      setRoutes(response.body.routes);
    }
  };

  const renderPassengerPoints = () =>
    examplePassengerPoints.map(point => (
      <MapboxGL.PointAnnotation
        key={point.id}
        id="selected"
        coordinate={point.coordinates}
        onSelected={e => {
          _onShow();
          setCenter(point.coordinates);
          setRide(point);
        }}
        onDeselected={() => {
          _onHide();
          setRide(null);
          setCenter(coordinates);
          setBounds(null);
          setRoutes([]);
        }}>
        <Marker
          color={getColor(point.timeLeft)}
          size={6 * vw}
          style={{
            marginTop: -6 * vw,
            padding: 2.5 * vw,
          }}
        />
      </MapboxGL.PointAnnotation>
    ));

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

  const renderPassenger = () => (
    <>
      <MapboxGL.MapView
        ref={_passengerMap}
        style={{flex: 1}}
        styleURL="mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft"
        contentInset={10}
        compassEnabled={false}
        onPress={() => {
          if (visible) {
            _onHide();
            setRide(null);
            setCenter(coordinates);
            setBounds(null);
            setRoutes([]);
          }
        }}
        rotateEnabled={false}>
        <MapboxGL.Camera
          ref={_passengerCamera}
          zoomLevel={14}
          maxZoomLevel={19}
          animationMode="flyTo"
          animationDuration={500}
          centerCoordinate={
            bounds ? undefined : [center[0], center[1] - 0.0015]
          }
          bounds={bounds ? bounds : undefined}
        />
        <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
        {renderPassengerPoints()}
        {renderRoutes()}
      </MapboxGL.MapView>
      <RideInfoSheet
        visible={visible}
        point={ride}
        userLocation={coordinates}
        onShowWay={onShowWay}
      />
      {!visible && routes.length ? (
        <RouteInfoSheet
          route={routes[activeRoute]}
          onGoBack={() => {
            setRoutes([]);
            setVisible(true);
            setBounds(null);
            setCenter(ride.coordinates);
          }}
        />
      ) : null}
    </>
  );

  const renderDriver = () => (
    <MapboxGL.MapView
      ref={_driverMap}
      style={{flex: 1}}
      styleURL="mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft"
      contentInset={10}
      compassEnabled={false}>
      <MapboxGL.Camera
        zoomLevel={14}
        maxZoomLevel={19}
        animationMode="flyTo"
        animationDuration={500}
        //followUserLocation
        //followUserMode={'normal'}
        centerCoordinate={[coordinates[0], coordinates[1] - 0.0015]}
      />
      <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
    </MapboxGL.MapView>
  );

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <View style={{flex: 1}}>
          <HamburgerMenu />
          <AccountSwitch />
          {activeAccount === 'passenger' ? renderPassenger() : renderDriver()}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
