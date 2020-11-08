import React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {colors} from '../../../styles';
import {styles} from './index.styles';
import LocationsListItem from '../LocationsListItem';

const GroupsFlatlist = ({data, loading, onItemPress}) => (
  <FlatList
    keyboardShouldPersistTaps="always"
    style={styles.flatlist}
    contentContainerStyle={styles.contentContainer}
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
  />
);

export default GroupsFlatlist;
