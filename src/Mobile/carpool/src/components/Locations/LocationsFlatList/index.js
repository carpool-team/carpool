import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {colors} from '../../../styles';
import {useNavigation} from '@react-navigation/core';
import CurrentLocationListItem from '../CurrentLocationListItem';
import {styles} from './index.styles';
import LocationsListItem from '../LocationsListItem';

const LocationsFlatList = ({data, loading, _onCurrentClick}) => {
  const navigation = useNavigation();

  return (
    <FlatList
      style={styles.flatlist}
      contentContainerStyle={styles.contentContainer}
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
