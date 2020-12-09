import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../../styles';
import {useReverseGeocoding} from '../../../hooks';
import {parseCoords} from '../../../utils/coords';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './index.styles';

const GroupWaypoints = ({group, location, swap}) => {
  const [placeName, setPlaceName] = useState(null);

  const [results, loading, error, _getPlaceName] = useReverseGeocoding();

  useEffect(() => {
    _getPlaceName(parseCoords(location.coordinates));
  }, []);

  useEffect(() => {
    if (results) {
      results.body.features.length &&
        setPlaceName(results.body.features[0].place_name);
    }
  }, [results]);

  return (
    <View style={styles.container}>
      {loading ? null : (
        <View style={styles.wrapper}>
          <View style={styles.columnLeft}>
            <Icon name="circle" size={14} color={colors.blue} />
            <View style={styles.line} />
            <Icon name="circle" size={14} color={colors.green} />
          </View>
          {swap ? (
            <View style={styles.columnRight}>
              <Text style={styles.placeName} numberOfLines={1}>
                {group.name}
              </Text>
              <Text style={styles.placeName} numberOfLines={1}>
                {placeName}
              </Text>
            </View>
          ) : (
            <View style={styles.columnRight}>
              <Text style={styles.placeName} numberOfLines={1}>
                {placeName}
              </Text>
              <Text style={styles.placeName} numberOfLines={1}>
                {group.name}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default GroupWaypoints;
