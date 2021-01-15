import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Alert, Text} from 'react-native';
import {GoBack} from '../../../../components/navigation';
import * as actions from '../../../../store/actions';
import {useDispatch} from 'react-redux';
import RidesList from '../../../../components/Driver/RidesList';
import {styles} from './index.styles';
import {sortRides, byExtension} from '../../../../utils/rides';

const SearchResults = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [sortedResults, setSortedResults] = useState(null);

  const {data} = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    onRefresh();
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
    });
  }, []);

  useEffect(() => {
    if (results) {
      setSortedResults(sortRides([...results], data.location, byExtension));
    }
  }, [results]);

  useEffect(() => {
    if (sortedResults) {
      setLoading(false);
    }
  }, [sortedResults]);

  const onRefresh = () => {
    setLoading(true);
    dispatch(
      actions.findRides({
        groupId: data.group.groupId,
        rideDirection: data.swap ? 1 : 0,
        dateTime: data.date,
      }),
    )
      .then(res => {
        setResults(res);
      })
      .catch(err => {
        Alert.alert(
          'Error',
          'An error ocurred when trying to fetch rides from the server. Please try again.',
          [
            {
              text: 'Ok',
              onPress: () => navigation.goBack(),
              style: 'default',
            },
          ],
        );
      });
  };

  const onItemPress = ride =>
    navigation.navigate('SelectedRideDetails', {
      ride,
      data,
    });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.select}>Select a ride</Text>
        <RidesList
          data={sortedResults}
          loading={loading}
          onRefresh={onRefresh}
          onItemPress={onItemPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchResults;
