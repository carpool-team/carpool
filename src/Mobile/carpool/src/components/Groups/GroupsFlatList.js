import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {vh, vw} from '../../utils/constants';
import GroupListItem from './GroupListItem';
import colors from '../../styles/colors';

const GroupsFlatList = ({data, loading, onItemPress}) => {
  return (
    <FlatList
      data={data}
      style={{
        width: '100%',
        paddingTop: 2 * vh,
      }}
      contentContainerStyle={{
        paddingHorizontal: 4 * vw,
      }}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <GroupListItem item={item} onItemPress={onItemPress} />
      )}
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

export default GroupsFlatList;
