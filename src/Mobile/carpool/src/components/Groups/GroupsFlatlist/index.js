import React from 'react';
import {RefreshControl, FlatList, Text, View} from 'react-native';
import {colors} from '../../../styles';
import {styles} from './index.styles';
import ListItem from './ListItem';
import {ListEmptyComponent} from '../../common/lists';

const GroupsFlatlist = ({data, loading, onItemPress}) => (
  <FlatList
    keyboardShouldPersistTaps="always"
    style={styles.flatlist}
    data={data}
    keyExtractor={item => item.groupId}
    renderItem={({item}) => <ListItem item={item} onItemPress={onItemPress} />}
    refreshControl={
      <RefreshControl
        colors={[colors.green]}
        tintColor={colors.green}
        refreshing={loading}
      />
    }
    ListEmptyComponent={
      <ListEmptyComponent title="You are not a member of any group yet. You will be able to create a new ride once you join one." />
    }
  />
);

export default GroupsFlatlist;
