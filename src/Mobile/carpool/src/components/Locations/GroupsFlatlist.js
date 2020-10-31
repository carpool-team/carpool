import React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {colors} from '../../styles';
import LocationsListItem from '../Locations/LocationsListItem';

const GroupsFlatlist = ({data, loading, onItemPress}) => {
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
    />
  );
};

export default GroupsFlatlist;
