import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../styles/colors';
import {vw, vh} from '../../utils/constants';

const RideInfoSheet = ({visible, ride}) => {
  console.log(ride);
  return visible ? (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}>
      <View
        style={{
          width: '100%',
        }}>
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
            borderTopRightRadius: 8 * vw,
            borderTopLeftRadius: 8 * vw,
            height: 2 * vh,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.background,
            height: 35 * vh,
            justifyContent: 'center',
          }}>
          <Text>Test</Text>
        </View>
      </View>
    </View>
  ) : null;
};

export default RideInfoSheet;
