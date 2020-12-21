import React, {useEffect} from 'react';
import {Text, SafeAreaView} from 'react-native';
import {useActiveAccount} from '../../../../hooks';
import {GoBack} from '../../../../components/navigation';
import {useSelector, useDispatch} from 'react-redux';
import {PassengersRideRequests} from '../../../../components/RideRequests';
import {styles} from './index.styles';
import * as actions from '../../../../store/actions';

const RideRequests = ({navigation}) => {
  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  const passengersRequests = useSelector(
    state => state.passengerReducer.rideRequests,
  );
  const driversRequests = useSelector(
    state => state.driverReducer.rideRequests,
  );
  console.log(driversRequests);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
    });
  }, []);

  const onRefreshPassenger = () =>
    dispatch(actions.getPassengersRideRequests());

  return (
    <SafeAreaView style={styles.safeArea}>
      {isPassenger ? (
        <PassengersRideRequests
          data={passengersRequests.data}
          loading={passengersRequests.loading}
          onRefresh={onRefreshPassenger}
        />
      ) : (
        <Text>Drivers ride requests</Text>
      )}
    </SafeAreaView>
  );
};

export default RideRequests;
