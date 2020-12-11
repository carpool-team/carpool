import React from 'react';
import {RefreshControl, FlatList, Text, View} from 'react-native';
import {colors} from '../../../styles';
import {styles} from './index.styles';
import ListItem from './ListItem';

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
  />
);

export default GroupsFlatlist;
