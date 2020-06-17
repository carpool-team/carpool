import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {vw, vh} from '../../utils/constants';
import {colors} from '../../styles';
import LocationsListItem from '../Locations/LocationsListItem';

const DestinationLocationsFlatList = ({data, loading, onItemPress}) => {
  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      style={{
        width: '100%',
      }}
      contentContainerStyle={{
        paddingHorizontal: 8 * vw,
        paddingTop: 2 * vh,
      }}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <LocationsListItem item={item} onPress={() => onItemPress(item)} />
      )}
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

export default DestinationLocationsFlatList;
