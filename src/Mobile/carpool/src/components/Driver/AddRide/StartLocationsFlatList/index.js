import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import LocationsListItem from '../../LocationsListItem';
import {colors, sheet} from '../../../../styles';
import {useReverseGeocoding} from '../../../../hooks';
import {BlueMarker} from '../../../common/map';
import {styles} from './index.styles';

const StartLocationsFlatList = ({data, loading, onItemPress, userLocation}) => {
  const [placeName, setPlaceName] = useState(null);

  const [
    results,
    locationLoading,
    error,
    _getPlaceName,
  ] = useReverseGeocoding();

  useEffect(() => {
    if (userLocation) {
      _getPlaceName(userLocation);
    }
  }, [userLocation]);

  useEffect(() => {
    if (results) {
      results.body.features.length &&
        setPlaceName(results.body.features[0].place_name);
    }
  }, [results]);

  const onLocationPress = () =>
    onItemPress({
      center: userLocation,
      place_name: placeName,
    });

  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      style={styles.flatList}
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <LocationsListItem item={item} onPress={() => onItemPress(item)} />
      )}
      ListHeaderComponent={
        locationLoading ? (
          <View style={sheet.center}>
            <ActivityIndicator size="small" color={colors.blue} />
          </View>
        ) : (
          <TouchableOpacity style={sheet.rowCenter} onPress={onLocationPress}>
            <BlueMarker size={18} style={styles.marker} />
            <Text style={styles.placeName}>{placeName}</Text>
          </TouchableOpacity>
        )
      }
      refreshControl={
        <RefreshControl
          colors={[colors.green]}
          tintColor={colors.green}
          refreshing={loading}
        />
      }
    />
  );
};

export default StartLocationsFlatList;
