import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {sheet, colors} from '../../styles';
import {Marker} from '../common';
import {vw} from '../../utils/constants';
import {geocodingClient} from '../../maps/mapbox';

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

const Waypoints = ({style, ride, start}) => {
  const [loading, setLoading] = useState(false);
  const [startName, setStartName] = useState(null);

  useEffect(() => {
    if (start.length) {
      onGetPlaceName(start);
    }
  }, [start]);

  const onGetPlaceName = async coords => {
    try {
      setLoading(true);
      const response = await geocodingClient
        .reverseGeocode({
          query: coords,
        })
        .send();

      const result = response.body.features[0];
      setStartName(result.place_name);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Marker
        size={8 * vw}
        color={getColor(ride.timeLeft)}
        style={{marginRight: 3 * vw}}
      />
      {loading ? null : (
        <View style={styles.column}>
          <Text style={{flex: 4}} numberOfLines={1}>
            <Text style={styles.from}>From: </Text>
            <Text style={styles.placeName}>{startName}</Text>
          </Text>
          <Text style={{flex: 1}}>
            <Text style={styles.to}>To: </Text>
            <Text style={styles.placeName}>{ride.group.name}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...sheet.rowCenter,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  from: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 4 * vw,
  },
  to: {
    ...sheet.textBold,
    color: colors.green,
    fontSize: 4 * vw,
  },
  placeName: {
    ...sheet.textSemiBold,
    fontSize: 4 * vw,
    color: colors.grayDark,
  },
});

export default Waypoints;
