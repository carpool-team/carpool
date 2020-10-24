import React, {useRef, useContext} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import config from '../../../config';
import {CircleButton} from '../../components/common/buttons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../styles';
import {vh} from '../../utils/constants';
import {useNavigation} from '@react-navigation/core';
import {DriverContext} from '../../context/DriverContext';

const DriverMap = ({coordinates, _onLocateUser}) => {
  const _driverMap = useRef(null);
  const navigation = useNavigation();
  const {driverState} = useContext(DriverContext);

  return (
    <>
      <MapboxGL.MapView
        ref={_driverMap}
        style={{flex: 1}}
        styleURL={config.mapLight}
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
        style={{position: 'absolute', bottom: 8 * vh, right: 20}}
        onPress={() => navigation.navigate('AddRide')}
        icon={<Icon name="plus" color={colors.grayDark} size={24} />}
      />
    </>
  );
};

export default DriverMap;
