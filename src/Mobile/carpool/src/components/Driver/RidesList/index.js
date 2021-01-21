import React from 'react';
import {FlatList, RefreshControl, View, Text} from 'react-native';
import {colors, sheet} from '../../../styles';
import {ListEmptyComponent} from '../../common/lists';
import ListItem from './ListItem';
import {styles} from './index.styles';

const RidesList = ({
  data,
  loading,
  onRefresh,
  onItemPress,
  reverse,
  showHeader,
}) => (
  <FlatList
    data={reverse && data ? data.reverse() : data}
    style={styles.flatlist}
    contentContainerStyle={styles.contentContainer}
    keyExtractor={item => item.rideId.toString()}
    renderItem={({item}) => <ListItem item={item} onItemPress={onItemPress} />}
    refreshControl={
      <RefreshControl
        colors={[colors.green]}
        tintColor={colors.green}
        refreshing={loading}
        onRefresh={onRefresh}
      />
    }
    ListHeaderComponent={
      showHeader && (
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>
            These bars indicate how much the original route will extend if you
            join
          </Text>
        </View>
      )
    }
    ListEmptyComponent={
      !loading && (
        <ListEmptyComponent title="no rides found" onRefresh={onRefresh} />
      )
    }
  />
);

export default RidesList;
