import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {sheet, colors} from '../../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UpView} from '../../../common';
import {parseCoords} from '../../../../utils/coords';
import useReverseGeocoding from '../../../../hooks/useReverseGeocoding';
import {styles} from './index.styles';

const ListItem = ({stop, onItemPress}) => {
  const [placeName, setPlaceName] = useState(null);

  const [results, loading, error, _getPlaceName] = useReverseGeocoding();

  useEffect(() => {
    _getPlaceName(parseCoords(stop.location));
  }, []);

  useEffect(() => {
    if (results) {
      results.body.features.length &&
        setPlaceName(results.body.features[0].place_name);
    }
  }, [results]);

  return (
    <UpView
      style={styles.upview}
      contentContainerStyle={styles.contentContainer}
      borderRadius={8}>
      <View style={sheet.rowCenterSplit}>
        <View style={sheet.rowCenter}>
          <Icon name="map-marker" color={colors.orange} size={20} />
          <Text style={styles.name}>{`${stop.participant.firstName} ${
            stop.participant.lastName
          }`}</Text>
        </View>
        <TouchableOpacity onPress={() => onItemPress(stop)}>
          <Icon name="close" color={colors.red} size={25} />
        </TouchableOpacity>
      </View>
      {placeName ? (
        <Text numberOfLines={2} style={styles.placeName}>
          {placeName}
        </Text>
      ) : (
        <ActivityIndicator size="small" color={colors.blue} />
      )}
    </UpView>
  );
};

export default ListItem;
