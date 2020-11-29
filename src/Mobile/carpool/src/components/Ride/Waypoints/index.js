import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {geocodingClient} from '../../../maps/mapbox';
import {parseCoords} from '../../../utils/coords';
import {styles} from './index.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, sheet} from '../../../styles';

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
      {loading ? null : (
        <View style={styles.wrapper}>
          <View style={styles.columnLeft}>
            <Icon name="circle" size={14} color={colors.blue} />
            <View style={styles.line} />
            <Icon name="circle" size={14} color={colors.green} />
          </View>
          <View style={styles.columnRight}>
            <Text style={styles.placeName} numberOfLines={1}>
              {startName}
            </Text>
            <Text style={styles.placeName} numberOfLines={1}>
              {destName}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Waypoints;
