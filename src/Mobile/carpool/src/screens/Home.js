import React, {useState, useRef, useEffect} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {vw, vh} from '../utils/constants';
import HamburgerMenu from '../components/navigation/HamburgerMenu';
import BottomSheet from 'reanimated-bottom-sheet';

const Home = () => {
  const [coordinates, setCoordinates] = useState([
    [16.87939183014879, 52.445182084892735],
  ]);

  const [visible, setVisible] = useState(false);

  const _bottomSheet = useRef();

  const _onShow = () => {
    _bottomSheet.current.snapTo(0);
    setVisible(true);
  };

  const _onHide = () => {
    _bottomSheet.current.snapTo(2);
    setVisible(false);
  };

  const _onLocateUser = e => {
    if (e) {
      const {
        coords: {latitude, longitude},
      } = e;
      setCoordinates([[longitude, latitude]]);
    }
  };

  const _renderContent = () => (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.background,
        height: '100%',
        justifyContent: 'center',
      }}>
      <Text>Test</Text>
    </View>
  );

  const _renderHeader = () => (
    <View
      style={{
        backgroundColor: colors.background,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        alignItems: 'center',
        borderTopRightRadius: 20 * vw,
        borderTopLeftRadius: 20 * vw,
      }}>
      <TouchableOpacity
        style={{
          width: 20 * vw,
          height: 0.6 * vh,
          backgroundColor: colors.grayDark,
          borderRadius: 1000,
          marginVertical: 1 * vh,
        }}
        onPress={_onHide}></TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
        <View style={{flex: 1}}>
          <HamburgerMenu />
          <MapboxGL.MapView
            style={{flex: 1}}
            onPress={event => console.log(event)}
            styleURL="mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft">
            <MapboxGL.Camera
              zoomLevel={16}
              animationMode="flyTo"
              animationDuration={0}
              followUserLocation
              followUserMode={'normal'}
            />
            <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
          </MapboxGL.MapView>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 20,
            top: 44,
            right: 20,
            width: 100,
            height: 100,
            backgroundColor: 'red',
          }}
          onPress={visible ? _onHide : _onShow}
        />
      </SafeAreaView>
      <BottomSheet
        ref={_bottomSheet}
        snapPoints={[40 * vh, 40 * vh, 0]}
        renderContent={_renderContent}
        renderHeader={_renderHeader}
        initialSnap={2}
      />
    </View>
  );
};

export default Home;
