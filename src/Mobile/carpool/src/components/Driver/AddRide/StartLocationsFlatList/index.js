import React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import LocationsListItem from '../../LocationsListItem';
import {colors} from '../../../../styles';

const StartLocationsFlatList = ({data, loading, onItemPress}) => (
  <FlatList
    keyboardShouldPersistTaps="always"
    style={{
      width: '100%',
    }}
    contentContainerStyle={{
      paddingHorizontal: 12,
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

export default StartLocationsFlatList;
