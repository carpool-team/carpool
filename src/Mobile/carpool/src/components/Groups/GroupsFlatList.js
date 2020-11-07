import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import GroupListItem from './GroupListItem';
import colors from '../../styles/colors';

const GroupsFlatList = ({data, loading, onItemPress, onRefresh}) => (
  <FlatList
    data={data}
    style={styles.flatlist}
    contentContainerStyle={styles.contentContainer}
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

const styles = StyleSheet.create({
  flatlist: {
    width: '100%',
    paddingTop: 18,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
});

export default GroupsFlatList;
