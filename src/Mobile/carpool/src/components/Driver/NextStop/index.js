import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useReverseGeocoding} from '../../../hooks';
import {parseCoords} from '../../../utils/coords';
import {sheet, colors} from '../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './index.styles';

const NextStop = ({location}) => {
  const [placeName, setPlaceName] = useState(null);

  const [results, loading, error, _getPlaceName] = useReverseGeocoding();

  useEffect(() => {
    _getPlaceName(parseCoords(location));
  }, []);

  useEffect(() => {
    if (results) {
      results.body.features.length &&
        setPlaceName(results.body.features[0].place_name);
    }
  }, [results]);

  return loading ? (
    <View style={sheet.center}>
      <ActivityIndicator color={colors.blue} size="small" />
    </View>
  ) : (
    <View style={sheet.rowCenter}>
      <Icon name="map-marker" color={colors.orange} size={20} />
      <Text numberOfLines={2} style={styles.placeName}>
        {placeName}
      </Text>
    </View>
  );
};

export default NextStop;
