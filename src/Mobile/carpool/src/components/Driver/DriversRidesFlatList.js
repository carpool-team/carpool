import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import DriverRidesListItem from './DriverRidesListItem';
import {colors} from '../../styles';
import {ListEmptyComponent} from '../common/lists';

const DriversRidesFlatList = ({data, loading, onRefresh, onItemPress}) => {
  return (
    <FlatList
      data={data}
      style={styles.flatlist}
      contentContainerStyle={styles.contentContainer}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <DriverRidesListItem item={item} onItemPress={onItemPress} />
      )}
      refreshControl={
        <RefreshControl
          colors={[colors.green]}
          tintColor={colors.green}
          refreshing={loading}
          onRefresh={onRefresh}
        />
      }
      ListEmptyComponent={
        <ListEmptyComponent title="no rides found" onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  flatlist: {
    width: '100%',
    paddingTop: 18,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 72,
  },
});

export default DriversRidesFlatList;
