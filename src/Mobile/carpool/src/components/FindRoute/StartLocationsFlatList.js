import React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {vw, vh} from '../../utils/constants';
import LocationsListItem from '../LocationsListItem';
import colors from '../../styles/colors';
import CurrentLocationListItem from '../CurrentLocationListItem';

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
          colors={colors.green}
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
