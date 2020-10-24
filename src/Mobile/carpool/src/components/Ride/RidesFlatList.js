import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {vh} from '../../utils/constants';
import {colors} from '../../styles';
import DriverInfo from './DriverInfo';
import Waypoints from './Waypoints';
import {parseCoords} from '../../utils/coords';
import {useNavigation} from '@react-navigation/native';

const RidesFlatList = ({data, loading, onRefresh}) => {
  const navigation = useNavigation();

  const onItemPress = item => {
    navigation.navigate('Home', {ride: item});
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      style={{width: '100%'}}
      contentContainerStyle={styles.contentContainer}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => onItemPress(item)}
          style={styles.wrapper}>
          <DriverInfo ride={item} style={{marginBottom: 2 * vh}} />
          <Waypoints
            ride={item}
            start={parseCoords(item.startingLocation.coordinates)}
            style={{paddingHorizontal: 8}}
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
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 4 * vh,
  },
  wrapper: {
    marginBottom: 4 * vh,
    borderBottomWidth: 1,
    borderColor: colors.grayDark,
    paddingBottom: 4 * vh,
  },
});

export default RidesFlatList;
