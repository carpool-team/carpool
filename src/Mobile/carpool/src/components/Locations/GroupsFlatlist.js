import React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {vh} from '../../utils/constants';
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

export default GroupsFlatlist;
