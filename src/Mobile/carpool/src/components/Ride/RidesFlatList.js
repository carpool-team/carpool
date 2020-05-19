import React from 'react';
import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {vw, vh} from '../../utils/constants';
import {colors} from '../../styles';
import DriverInfo from './DriverInfo';
import Waypoints from './Waypoints';
import {parseCoords} from '../../utils/coords';
import {useNavigation} from '@react-navigation/native';

const RidesFlatList = ({data}) => {
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
            style={{paddingHorizontal: 2 * vw}}
          />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 6 * vw,
    paddingVertical: 4 * vh,
  },
  wrapper: {
    marginBottom: 4 * vh,
    borderBottomWidth: 0.2 * vw,
    borderColor: colors.grayDark,
    paddingBottom: 4 * vh,
  },
});

export default RidesFlatList;
