import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import colors from '../../../styles/colors';
import ListItem from './ListItem';
import {ListEmptyComponent} from '../../common/lists';
import {styles} from './index.styles';

const GroupsList = ({data, loading, onItemPress, onRefresh}) => (
  <FlatList
    data={data}
    style={styles.flatlist}
    contentContainerStyle={styles.contentContainer}
    keyExtractor={item => item.groupId}
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

export default GroupsList;
