import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import ListItem from './ListItem';
import {ListEmptyComponent} from '../../common/lists';

const GroupsList = ({data, loading, onItemPress, onRefresh}) => (
  <FlatList
    data={data}
    style={styles.flatlist}
    contentContainerStyle={styles.contentContainer}
    keyExtractor={item => Math.random().toString()}
    renderItem={({item}) => <ListItem item={item} onItemPress={onItemPress} />}
    refreshControl={
      <RefreshControl
        colors={[colors.green]}
        tintColor={colors.green}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    }
    ListEmptyComponent={
      <ListEmptyComponent title="You are not a member of any group yet" />
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

export default GroupsList;
