import React from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {colors} from '../../../styles';
import ListItem from './ListItem';
import {styles} from './index.styles';
import {ListEmptyComponent} from '../../common/lists';

const PassengersRideRequests = ({data, loading, onRefresh}) => (
  <FlatList
    data={data}
    style={styles.flatlist}
    contentContainerStyle={styles.contentContainer}
    keyExtractor={(item, index) => (item.ride.rideId + index).toString()}
    renderItem={({item}) => <ListItem item={item} />}
    refreshControl={
      <RefreshControl
        colors={[colors.blue]}
        tintColor={colors.blue}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    }
    ListEmptyComponent={
      <ListEmptyComponent title="You don't have any active ride requests" />
    }
  />
);

export default PassengersRideRequests;
