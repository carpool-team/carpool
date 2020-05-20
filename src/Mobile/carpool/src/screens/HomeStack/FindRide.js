import React, {useContext} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {vw, vh} from '../../utils/constants';
import {colors} from '../../styles';
import {CircleButton} from '../../components/common/buttons';
import Icon from 'react-native-vector-icons/FontAwesome';
import RidesFlatList from '../../components/Ride/RidesFlatList';
import {
  PassengerContext,
  createGetAllRides,
} from '../../context/PassengerContext';

const FindRide = ({navigation, route}) => {
  const {passengerState, dispatch} = useContext(PassengerContext);
  const {data: allRides, loading} = passengerState.allRides;

  const onPress = () => navigation.navigate('AskForRide');
  const onRefresh = () => {
    createGetAllRides(dispatch);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.wrapper}>
        <RidesFlatList
          data={allRides}
          onRefresh={onRefresh}
          loading={loading}
        />
      </View>
      <CircleButton
        style={styles.button}
        onPress={onPress}
        icon={<Icon name="plus" color={colors.grayDark} size={6 * vw} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 8 * vh,
    right: 5 * vw,
  },
});

export default FindRide;
