import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import colors from '../../styles/colors';
import {vw, vh} from '../../utils/constants';
import UpView from '../common/UpView';
import sheet from '../../styles/sheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
import turfDistance from '@turf/distance';
import {point as turfPoint} from '@turf/helpers';
import Marker from '../common/Marker';

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

const getDistance = dist => {
  if (dist < 1000) {
    return `${dist} m`;
  } else {
    return `${(dist / 1000).toFixed(1)} km`;
  }
};

const RideInfoSheet = ({visible, point, userLocation}) => {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (userLocation.length && point) {
      const userPoint = turfPoint(userLocation);
      const locPoint = turfPoint(point.coordinates);
      const dist = turfDistance(userPoint, locPoint);

      setDistance((dist * 1000).toFixed(0));
    }
  }, [point]);

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
            height: 4 * vh,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.background,
            //height: 35 * vh,
            paddingHorizontal: 4 * vw,
            paddingBottom: 4 * vh,
          }}>
          <UpView
            style={{
              width: '100%',
            }}
            borderRadius={4 * vw}>
            <View
              style={{
                flex: 1,
                paddingHorizontal: 3 * vw,
                paddingVertical: 2 * vh,
                ...sheet.rowCenter,
              }}>
              <UpView
                style={{
                  width: 16 * vw,
                  height: 16 * vw,
                  marginRight: 3 * vw,
                }}
                contentContainerStyle={sheet.center}
                borderRadius={9999}>
                <Ionicon
                  name="md-person"
                  color={colors.grayDark}
                  size={11 * vw}
                />
              </UpView>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: 16 * vw,
                  paddingVertical: 0.5 * vh,
                }}>
                <View
                  style={{
                    ...sheet.rowCenterSplit,
                  }}>
                  <Text
                    style={{
                      ...sheet.textBold,
                      fontSize: 4 * vw,
                      color: colors.grayDark,
                      flex: 1,
                      marginRight: 1 * vw,
                    }}
                    numberOfLines={1}>
                    {`${point.ride.user.firstName} ${point.ride.user.lastName}`}
                  </Text>
                  <Text
                    style={{
                      ...sheet.textBold,
                      fontSize: 4 * vw,
                      color: colors.yellow,
                    }}>
                    {getDistance(distance)}
                  </Text>
                </View>
                <Text
                  style={{
                    ...sheet.textBold,
                    fontSize: 4 * vw,
                    color: getColor(point.ride.timeLeft),
                  }}>
                  {`Leaving in ${point.ride.timeLeft} minutes`}
                </Text>
              </View>
            </View>
          </UpView>
          <View style={{width: '100%', marginTop: 3 * vh, ...sheet.rowCenter}}>
            <Marker
              size={8 * vw}
              color={getColor(point.ride.timeLeft)}
              style={{marginRight: 3 * vw}}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Text style={{flex: 4}}>
                <Text
                  style={{
                    ...sheet.textBold,
                    color: colors.blue,
                    fontSize: 4 * vw,
                  }}>
                  From:{' '}
                </Text>
                <Text
                  style={{
                    ...sheet.textSemiBold,
                    fontSize: 4 * vw,
                    color: colors.grayDark,
                  }}>
                  Stefana Batorego 9, Poznań
                </Text>
              </Text>
              <Text style={{flex: 1}}>
                <Text
                  style={{
                    ...sheet.textBold,
                    color: colors.green,
                    fontSize: 4 * vw,
                  }}>
                  To:{' '}
                </Text>
                <Text
                  style={{
                    ...sheet.textSemiBold,
                    fontSize: 4 * vw,
                    color: colors.grayDark,
                  }}>
                  Zakole 7, Suchy Las
                </Text>
              </Text>
            </View>
          </View>
          <UpView
            style={{width: '65%', height: 6 * vh, marginTop: 3 * vh}}
            borderRadius={100}
            contentContainerStyle={sheet.center}
            onPress={() => null}>
            <Text
              style={{
                ...sheet.textBold,
                color: colors.green,
                fontSize: 4 * vw,
              }}>
              Select
            </Text>
          </UpView>
        </View>
      </View>
    </View>
  ) : null;
};

export default RideInfoSheet;
