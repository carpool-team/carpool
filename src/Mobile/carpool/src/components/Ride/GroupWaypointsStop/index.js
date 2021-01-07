import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../../styles';
import {useReverseGeocoding} from '../../../hooks';
import {parseCoords} from '../../../utils/coords';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './index.styles';

const GroupWaypointsStop = ({group, location, swap, stop}) => {
  const [placeName, setPlaceName] = useState(null);
  const [stopName, setStopName] = useState(null);

  const [results, loading, error, _getPlaceName] = useReverseGeocoding();
  const [sresults, sloading, serror, _sgetPlaceName] = useReverseGeocoding();

  useEffect(() => {
    _getPlaceName(parseCoords(location.coordinates));
    _sgetPlaceName(parseCoords(stop.location));
  }, []);

  useEffect(() => {
    if (results) {
      results.body.features.length &&
        setPlaceName(results.body.features[0].place_name);
    }
  }, [results]);

  useEffect(() => {
    if (sresults) {
      sresults.body.features.length &&
        setStopName(sresults.body.features[0].place_name);
    }
  }, [sresults]);

  return (
    <View style={styles.container}>
      {loading || sloading ? null : (
        <View style={styles.wrapper}>
          <View style={styles.columnLeft}>
            <Icon name="circle" size={12} color={colors.blue} />
            <View style={styles.line} />
            <Icon name="circle" size={12} color={colors.orange} />
            <View style={styles.line} />
            <Icon name="circle" size={12} color={colors.green} />
          </View>
          {swap ? (
            <View style={styles.columnRight}>
              <Text style={styles.placeName} numberOfLines={1}>
                {group.name}
              </Text>
              <Text style={styles.placeName} numberOfLines={1}>
                {stopName}
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
                {stopName}
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

export default GroupWaypointsStop;
