import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {geocodingClient} from '../../../maps/mapbox';
import {parseCoords} from '../../../utils/coords';
import {getColor} from '../../../utils/getColor';
import {styles} from './index.styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../styles';

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
      <Icon
        name="map-marker"
        size={50}
        color={colors.blue}
        style={styles.marker}
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

export default Waypoints;
