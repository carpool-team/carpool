import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {GoBack, Header} from '../../../components/navigation';
import * as actions from '../../../store/actions';
import {useDispatch} from 'react-redux';
import {RidesList} from '../../../components/Driver';
import SelectLocation from '../SearchStack/Search/sections/SelectLocation';

const GroupRides = ({route, navigation}) => {
  const {group} = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null);
  const [location, setLocation] = useState(null);

  const dispatch = useDispatch();

  if (location && selectedRide) {
    navigation.navigate('SearchStack', {
      screen: 'SelectedRideDetails',
      params: {
        ride: selectedRide,
        data: {location},
      },
    });
  }

  useEffect(() => {
    navigation.setOptions({
      title: group.name,
      headerLeft: () => (
        <GoBack onPress={() => navigation.navigate('Groups')} />
      ),
      header: props => <Header {...props} hideSwitch />,
    });

    onRefresh();
  }, []);

  const onRefresh = () => {
    setLoading(true);
    dispatch(actions.getGroupRides(group.groupId))
      .then(res => setData(res))
      .catch(err =>
        Alert.alert(
          'Error',
          'An error ocurred when trying to load data. Please try again.',
          [
            {
              text: 'Ok',
              style: 'default',
              onPress: () => navigation.goBack(),
            },
          ],
        ),
      )
      .finally(() => setLoading(false));
  };

  const onItemPress = item =>
    Alert.alert('Confirmation', 'Are you sure you want to join this ride?', [
      {
        text: 'Cancel',
        style: 'destructive',
      },
      {
        text: 'Confirm',
        style: 'default',
        onPress: () => setSelectedRide(item),
      },
    ]);

  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      {!selectedRide ? (
        <RidesList
          data={data}
          loading={loading}
          onItemPress={onItemPress}
          onRefresh={onRefresh}
        />
      ) : (
        <SelectLocation onSubmit={setLocation} />
      )}
    </SafeAreaView>
  );
};

export default GroupRides;
