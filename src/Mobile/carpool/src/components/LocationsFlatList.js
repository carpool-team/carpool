import React from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import {vw, vh} from '../utils/constants';
import LocationsListItem from './LocationsListItem';
import colors from '../styles/colors';
import sheet from '../styles/sheet';
import {useNavigation} from '@react-navigation/core';
import CurrentLocationListItem from './CurrentLocationListItem';

const LocationsFlatList = ({data, loading, isEmpty, _onCurrentClick}) => {
  const navigation = useNavigation();

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
      renderItem={({item}) => (
        <LocationsListItem
          item={item}
          onPress={() => navigation.navigate('ShowSelected', {selected: item})}
        />
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
        !isEmpty &&
        !loading && <CurrentLocationListItem onPress={_onCurrentClick} />
      }
      ListEmptyComponent={
        isEmpty ? (
          <View
            style={{
              width: '100%',
              height: 12 * vh,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...sheet.textSemiBold,
                fontSize: 5 * vw,
                color: colors.blue,
              }}>
              No places found
            </Text>
          </View>
        ) : null
      }
    />
  );
};

export default LocationsFlatList;
