import React, {useState, useEffect, useRef} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import HamburgerMenu from '../components/navigation/HamburgerMenu';
import AccountSwitch from '../components/navigation/AccountSwitch';
import Marker from '../components/common/Marker';
import {vw, vh} from '../utils/constants';
import {examplePassengerPoints} from '../examples/points';
import BottomSheet from 'reanimated-bottom-sheet';
import RideInfoSheet from '../components/Ride/RideInfoSheet';

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

const Home = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [center, setCenter] = useState([]);
  const [ride, setRide] = useState(null);
  const [visible, setVisible] = useState(false);

  const _map = useRef(null);

  useEffect(() => {
    if (!center.length) {
      setCenter(coordinates);
    }
  }, [coordinates]);

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

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <View style={{flex: 1}}>
          <HamburgerMenu />
          <AccountSwitch />
          <MapboxGL.MapView
            ref={_map}
            style={{flex: 1}}
            styleURL="mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft"
            contentInset={10}
            compassEnabled={false}
            onPress={e => console.log(e)}>
            <MapboxGL.Camera
              zoomLevel={14}
              maxZoomLevel={19}
              animationMode="flyTo"
              animationDuration={500}
              //followUserLocation={!center.length}
              //followUserMode={'normal'}
              centerCoordinate={[center[0], center[1] - 0.0015]}
            />
            <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
            {examplePassengerPoints.map(point => (
              <MapboxGL.PointAnnotation
                key={point.id}
                id="selected"
                coordinate={point.coordinates}
                onSelected={e => {
                  _onShow();
                  setCenter(point.coordinates);
                  setRide(point);
                  //_bottomSheet.current.snapTo(0);
                }}
                onDeselected={() => {
                  _onHide();
                  setRide(null);
                  setCenter(coordinates);
                }}>
                <Marker
                  color={getColor(point.timeLeft)}
                  size={6 * vw}
                  style={{
                    marginTop: -6 * vw,
                    padding: 2 * vw,
                  }}
                />
              </MapboxGL.PointAnnotation>
            ))}
          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
      <RideInfoSheet
        visible={visible}
        point={ride}
        userLocation={coordinates}
      />
    </View>
  );
};

export default Home;
