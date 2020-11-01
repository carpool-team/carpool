import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {colors} from '../../styles';
import LocationsListItem from '../Locations/LocationsListItem';
import {ListEmptyComponent} from '../common/lists';

const DestinationLocationsFlatList = ({data, loading, onItemPress}) => {
  return (
    <FlatList
      keyboardShouldPersistTaps="always"
      style={{
        width: '100%',
      }}
      contentContainerStyle={{
        paddingHorizontal: 32,
        paddingTop: 18,
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
      ListEmptyComponent={
        <ListEmptyComponent title="No locations found" onRefresh={() => null} />
      }
    />
  );
};

export default DestinationLocationsFlatList;
