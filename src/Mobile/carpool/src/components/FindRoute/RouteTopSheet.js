import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, sheet} from '../../styles';
import {BlueMarker} from '../common/map';
import Icon from 'react-native-vector-icons/FontAwesome';

const RouteTopSheet = ({start, destination}) => {
  return (
    <View style={styles.topSheet}>
      <View style={styles.contentContainer}>
        <View style={sheet.rowCenter}>
          <BlueMarker size={16} style={{marginRight: 12}} />
          <Text style={styles.placeName} numberOfLines={1}>
            {start.place_name}
          </Text>
        </View>
        <View style={[sheet.rowCenter, {marginTop: 18}]}>
          <Icon
            name="map-marker"
            color={colors.green}
            size={25}
            style={{marginRight: 12, marginBottom: 25}}
          />
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
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
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
    paddingHorizontal: 32,
    paddingTop: 18,
    paddingBottom: 27,
  },
  from: {
    ...sheet.textSemiBold,
    fontSize: 18,
    color: colors.blue,
  },
  to: {
    ...sheet.textSemiBold,
    fontSize: 18,
    color: colors.green,
  },
  placeName: {
    ...sheet.textMedium,
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 18,
    color: colors.grayVeryDark,
  },
});

export default RouteTopSheet;
