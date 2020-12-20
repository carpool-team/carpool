import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useActiveAccount} from '../../../../hooks';
import {GoBack} from '../../../../components/navigation';

const RideRequests = ({navigation}) => {
  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
    });
  }, []);

  return (
    <View>
      {isPassenger ? (
        <Text>Passengers ride requests</Text>
      ) : (
        <Text>Drivers ride requests</Text>
      )}
    </View>
  );
};

export default RideRequests;
