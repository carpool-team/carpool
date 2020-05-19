import React from 'react';
import {View, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import {vw, vh} from '../../utils/constants';
import DriverInfo from '../../components/Ride/DriverInfo';
import Waypoints from '../../components/Ride/Waypoints';
import {parseCoords} from '../../utils/coords';
import {colors} from '../../styles';
import {CircleButton} from '../../components/common/buttons';
import Icon from 'react-native-vector-icons/FontAwesome';

const FindRide = ({navigation, route}) => {
  const {rides} = route.params;

  const onItemPress = item => {
    navigation.navigate('Home', {ride: item});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FlatList
          data={rides}
          keyExtractor={item => item.id}
          style={{width: '100%'}}
          contentContainerStyle={{
            paddingHorizontal: 6 * vw,
            paddingVertical: 4 * vh,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => onItemPress(item)}
              style={{
                marginBottom: 4 * vh,
                borderBottomWidth: 0.2 * vw,
                borderColor: colors.grayDark,
                paddingBottom: 4 * vh,
              }}>
              <DriverInfo ride={item} style={{marginBottom: 2 * vh}} />
              <Waypoints
                ride={item}
                start={parseCoords(item.startingLocation.coordinates)}
                style={{paddingHorizontal: 2 * vw}}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <CircleButton
        style={{position: 'absolute', bottom: 8 * vh, right: 5 * vw}}
        onPress={() => navigation.navigate('AskForRide')}
        icon={<Icon name="plus" color={colors.grayDark} size={6 * vw} />}
      />
    </SafeAreaView>
  );
};

export default FindRide;
