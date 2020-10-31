import React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import LocationsListItem from '../Locations/LocationsListItem';
import {colors} from '../../styles';
import CurrentLocationListItem from '../Locations/CurrentLocationListItem';

const StartLocationsFlatList = ({
  data,
  loading,
  onItemPress,
  onCurrentClick,
}) => {
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
      ListHeaderComponent={
        !data.length &&
        !loading && <CurrentLocationListItem onPress={onCurrentClick} />
      }
    />
  );
};

export default StartLocationsFlatList;
