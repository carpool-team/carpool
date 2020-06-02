import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {sheet, colors} from '../../styles';
import {Marker} from '../common';
import {vw} from '../../utils/constants';
import {geocodingClient} from '../../maps/mapbox';
import {parseCoords} from '../../utils/coords';
import {getColor} from '../../utils/getColor';

const Waypoints = ({style, ride, start}) => {
  const [loading, setLoading] = useState(false);
  const [startName, setStartName] = useState(null);
  const [destName, setDestName] = useState(null);

  useEffect(() => {
    if (start.length && ride) {
      if (!startName || !destName) {
        onGetPlaceName(start);
        onGetDestinationName(parseCoords(ride.destination.coordinates));
      }
    }
  }, [start, ride]);

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

  const onGetDestinationName = async coords => {
    try {
      setLoading(true);
      const response = await geocodingClient
        .reverseGeocode({
          query: coords,
        })
        .send();

      const result = response.body.features[0];
      setDestName(result.place_name);
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
        color={getColor(ride.date)}
        style={{marginRight: 3 * vw}}
      />
      {loading ? null : (
        <View style={styles.column}>
          <Text numberOfLines={1}>
            <Text style={styles.from}>From: </Text>
            <Text style={styles.placeName}>{startName}</Text>
          </Text>
          <Text numberOfLines={1}>
            <Text style={styles.to}>To: </Text>
            <Text style={styles.placeName}>{destName}</Text>
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
    height: 13 * vw,
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
