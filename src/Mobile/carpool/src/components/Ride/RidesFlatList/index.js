import React from 'react';
import {FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import {colors} from '../../../styles';
import DriverInfo from '../DriverInfo';
import {parseCoords} from '../../../utils/coords';
import {useNavigation} from '@react-navigation/native';
import {ListEmptyComponent} from '../../common/lists';
import {styles} from './index.styles';
import Waypoints from '../Waypoints';

const RidesFlatList = ({data, loading, onRefresh}) => {
  const navigation = useNavigation();

  const onItemPress = item => {
    navigation.navigate('Home', {ride: item});
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      style={styles.flatlist}
      contentContainerStyle={styles.contentContainer}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => onItemPress(item)}
          style={styles.wrapper}>
          <DriverInfo ride={item} style={styles.driverInfo} />
          <Waypoints
            ride={item}
            start={parseCoords(item.startingLocation.coordinates)}
            style={styles.waypoints}
          />
        </TouchableOpacity>
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
        <ListEmptyComponent onRefresh={onRefresh} title="No rides found" />
      }
    />
  );
};

export default RidesFlatList;
