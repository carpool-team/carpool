import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import DriverRidesListItem from './DriverRidesListItem';
import {vh, vw} from '../../utils/constants';
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
    paddingHorizontal: 4 * vw,
  },
});

export default DriversRidesFlatList;
