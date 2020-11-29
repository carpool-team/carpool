import React, {useRef} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {CircleButton} from '../../components/common/buttons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../styles';
import {useNavigation} from '@react-navigation/core';
import {MAP_LIGHT} from '@env';

const DriverMap = ({coordinates, _onLocateUser}) => {
  const _driverMap = useRef(null);
  const navigation = useNavigation();

  return (
    <>
      <MapboxGL.MapView
        ref={_driverMap}
        style={{flex: 1}}
        styleURL={MAP_LIGHT}
        contentInset={10}
        compassEnabled={false}>
        <MapboxGL.Camera
          zoomLevel={14}
          maxZoomLevel={19}
          animationMode="flyTo"
          animationDuration={500}
          centerCoordinate={[coordinates[0], coordinates[1] - 0.0015]}
        />
        <MapboxGL.UserLocation visible onUpdate={_onLocateUser} />
      </MapboxGL.MapView>
      <CircleButton
        style={{position: 'absolute', bottom: '6%', right: 20}}
        onPress={() => navigation.navigate('AddRide')}
        icon={<Icon name="plus" color={colors.grayDark} size={24} />}
      />
    </>
  );
};

export default DriverMap;
