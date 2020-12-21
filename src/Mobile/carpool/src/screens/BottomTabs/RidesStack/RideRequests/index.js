import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {useActiveAccount} from '../../../../hooks';
import {GoBack} from '../../../../components/navigation';
import {useSelector} from 'react-redux';
import UpView from '../../../../components/common/UpView';
import {PassengersRideRequests} from '../../../../components/RideRequests';

const RideRequests = ({navigation}) => {
  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  const passengersRequests = useSelector(
    state => state.passengerReducer.rideRequests,
  );
  const driversRequests = useSelector(
    state => state.driverReducer.rideRequests,
  );
  console.log(passengersRequests);
  console.log(driversRequests);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {isPassenger ? (
        <PassengersRideRequests
          data={passengersRequests.data}
          loading={passengersRequests.loading}
          onRefresh={() => null}
        />
      ) : (
        <Text>Drivers ride requests</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    flex: 1,
  },
  flatlist: {
    width: '100%',
  },
  contentContainer: {
    paddingTop: 30,
    paddingHorizontal: 16,
  },
});

export default RideRequests;
