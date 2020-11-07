import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {colors} from '../../styles';
import {CircleButton} from '../../components/common/buttons';
import Icon from 'react-native-vector-icons/FontAwesome';
import RidesFlatList from '../../components/Ride/RidesFlatList';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions';

const FindRide = ({navigation, route}) => {
  const dispatch = useDispatch();
  const allRides = useSelector(state => state.passengerReducer.allRides);

  const onPress = () => navigation.navigate('AskForRide');
  const onRefresh = () => {
    dispatch(actions.getAllRides());
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.wrapper}>
        <RidesFlatList
          data={allRides.data}
          onRefresh={onRefresh}
          loading={allRides.loading}
        />
      </View>
      <CircleButton
        style={styles.button}
        onPress={onPress}
        icon={<Icon name="plus" color={colors.grayDark} size={24} />}
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
    bottom: 72,
    right: 20,
  },
});

export default FindRide;
