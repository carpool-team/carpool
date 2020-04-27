import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import {vw, vh} from '../../utils/constants';
import sheet from '../../styles/sheet';
import BlueMarker from '../common/BlueMarker';
import Marker from '../common/Marker';

const RouteTopSheet = ({start, destination}) => {
  return (
    <View style={styles.topSheet}>
      <View style={styles.contentContainer}>
        <View style={sheet.rowCenter}>
          <BlueMarker size={4 * vw} style={{marginRight: 3 * vw}} />
          {/* <Text style={styles.from}>From: </Text> */}
          <Text style={styles.placeName} numberOfLines={1}>
            {start.place_name}
          </Text>
        </View>
        <View style={[sheet.rowCenter, {marginTop: 2 * vh}]}>
          <Marker
            color={colors.green}
            size={4 * vw}
            style={{marginRight: 3 * vw}}
          />
          {/* <Text style={styles.to}>To: </Text> */}
          <Text style={styles.placeName} numberOfLines={1}>
            {destination.place_name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    zIndex: 10,
    borderBottomLeftRadius: 4 * vw,
    borderBottomRightRadius: 4 * vw,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8 * vw,
    paddingTop: 2 * vh,
    paddingBottom: 3 * vh,
  },
  from: {
    ...sheet.textSemiBold,
    fontSize: 4.5 * vw,
    color: colors.blue,
  },
  to: {
    ...sheet.textSemiBold,
    fontSize: 4.5 * vw,
    color: colors.green,
  },
  placeName: {
    ...sheet.textMedium,
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 4.5 * vw,
    color: colors.grayVeryDark,
  },
});

export default RouteTopSheet;
