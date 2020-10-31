import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import GroupListItem from './GroupListItem';
import colors from '../../styles/colors';

const GroupsFlatList = ({data, loading, onItemPress, onRefresh}) => {
  return (
    <FlatList
      data={data}
      style={{
        width: '100%',
        paddingTop: 18,
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      keyExtractor={item => Math.random().toString()}
      renderItem={({item}) => (
        <GroupListItem item={item} onItemPress={onItemPress} />
      )}
      refreshControl={
        <RefreshControl
          colors={[colors.green]}
          tintColor={colors.green}
          refreshing={loading}
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default GroupsFlatList;
