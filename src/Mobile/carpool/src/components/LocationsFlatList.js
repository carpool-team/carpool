import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {vw, vh} from '../utils/constants';
import LocationsListItem from './LocationsListItem';
import colors from '../styles/colors';

const LocationsFlatList = ({data, loading}) => {
  return (
    <FlatList
      style={{
        width: '100%',
      }}
      contentContainerStyle={{
        paddingHorizontal: 8 * vw,
        paddingTop: 2 * vh,
      }}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => <LocationsListItem item={item} />}
      refreshControl={
        <RefreshControl
          colors={colors.green}
          tintColor={colors.green}
          refreshing={loading}
        />
      }
    />
  );
};

export default LocationsFlatList;
