import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {GoBack, Header} from '../../../components/navigation';
import * as actions from '../../../store/actions';
import {useDispatch} from 'react-redux';
import {RidesList} from '../../../components/Driver';
import SelectLocation from '../SearchStack/Search/sections/SelectLocation';
import {sortStops} from '../../../utils/sortStops';
import {parseCoords} from '../../../utils/coords';
import {lineString} from '@turf/helpers';
import length from '@turf/length';
import moment from 'moment';

const compare = (a, b) => {
  const isSame = moment(a.rideDate).isSame(b.rideDate, 'day');
  if (isSame) {
    if (a.extension < b.extension) {
      return -1;
    }
    if (a.extension > b.extension) {
      return 1;
    }
    return 0;
  }
  return 0;
};

const sortRides = (data, location, compareFunction) => {
  let extended = [];
  data.forEach(item => {
    const {sortedStops} = sortStops(
      item.location,
      item.group.location,
      item.stops,
    );
    const line = lineString(sortedStops.map(item => parseCoords(item)));
    const lineLength = length(line, {units: 'meters'});

    const stopsWith = [...item.stops, {location: location.coordinates}];
    const {sortedStops: sortedWith} = sortStops(
      item.location,
      item.group.location,
      stopsWith,
    );

    const lineWith = lineString(sortedWith.map(item => parseCoords(item)));
    const lineWithLength = length(lineWith, {units: 'meters'});

    const extension = Math.trunc(
      ((lineWithLength - lineLength) / lineLength) * 100,
    );

    extended = [
      ...extended,
      {
        ...item,
        extension,
      },
    ];
  });

  const sorted = [...extended].sort(compareFunction);

  return sorted;
};

const GroupRides = ({route, navigation}) => {
  const {group} = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [sortedData, setSortedData] = useState(null);
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
    const onPress = () => {
      if (location) {
        setLocation(null);
      } else {
        navigation.goBack();
      }
    };

    navigation.setOptions({
      title: group.name,
      header: props => <Header {...props} />,
      headerLeft: () => <GoBack onPress={onPress} />,
    });

    onRefresh();
  }, [location]);

  useEffect(() => {
    if (data && location) {
      // sortRides([...data], location, compare);
      setSortedData(sortRides([...data], location, compare));
    }
  }, [data, location]);

  useEffect(() => {
    if (sortedData) {
      setLoading(false);
    }
  }, [sortedData]);

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
      );
    // .finally(() => setLoading(false));
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
      {!location ? (
        <SelectLocation onSubmit={setLocation} />
      ) : (
        <RidesList
          // data={data}
          data={sortedData}
          loading={loading}
          onItemPress={onItemPress}
          onRefresh={onRefresh}
        />
      )}
    </SafeAreaView>
  );
};

export default GroupRides;
