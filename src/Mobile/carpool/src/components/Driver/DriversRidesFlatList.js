import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import DriverRidesListItem from './DriverRidesListItem';
import {vh} from '../../utils/constants';
import {colors} from '../../styles';

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
    />
  );
};

const styles = StyleSheet.create({
  flatlist: {
    width: '100%',
    paddingTop: 2 * vh,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8 * vh,
  },
});

export default DriversRidesFlatList;
