import React from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {vh} from '../../utils/constants';
import LocationsListItem from '../Locations/LocationsListItem';
import {colors} from '../../styles';
import {useNavigation} from '@react-navigation/core';
import CurrentLocationListItem from './CurrentLocationListItem';

const LocationsFlatList = ({data, loading, _onCurrentClick}) => {
  const navigation = useNavigation();

  return (
    <FlatList
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
        <LocationsListItem
          item={item}
          onPress={() => navigation.navigate('ShowSelected', {selected: item})}
        />
      )}
      refreshControl={
        <RefreshControl
          colors={[colors.green]}
          tintColor={colors.green}
          refreshing={loading}
        />
      }
      ListHeaderComponent={
        !data.length &&
        !loading && <CurrentLocationListItem onPress={_onCurrentClick} />
      }
    />
  );
};

export default LocationsFlatList;
