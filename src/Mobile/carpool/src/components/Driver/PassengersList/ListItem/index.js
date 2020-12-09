import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {sheet, colors} from '../../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UpView} from '../../../common';
import {parseCoords} from '../../../../utils/coords';
import useReverseGeocoding from '../../../../hooks/useReverseGeocoding';

const ListItem = ({stop, onItemPress}) => {
  const [placeName, setPlaceName] = useState(null);

  const [results, loading, error, _getPlaceName] = useReverseGeocoding();

  useEffect(() => {
    _getPlaceName(parseCoords(stop.coordinates));
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
          <Text style={styles.name}>{`${stop.user.firstName} ${
            stop.user.lastName
          }`}</Text>
        </View>
        <TouchableOpacity onPress={() => onItemPress(stop)}>
          <Icon name="trash" color={colors.red} size={25} />
        </TouchableOpacity>
      </View>
      {!!placeName && (
        <Text numberOfLines={2} style={styles.placeName}>
          {placeName}
        </Text>
      )}
    </UpView>
  );
};

const styles = StyleSheet.create({
  upview: {
    width: '100%',
    height: 100,
    marginTop: 16,
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  name: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 18,
    marginLeft: 8,
  },
  placeName: {
    fontSize: 14,
    color: colors.grayDark,
    ...sheet.textSemiBold,
  },
});

export default ListItem;
