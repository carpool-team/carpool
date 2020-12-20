import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Alert, Text} from 'react-native';
import {GoBack} from '../../../../components/navigation';
import * as actions from '../../../../store/actions';
import {useDispatch} from 'react-redux';
import RidesList from '../../../../components/Driver/RidesList';
import {styles} from './index.styles';

const SearchResults = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const {data} = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    onRefresh();
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
    });
  }, []);

  const onRefresh = () =>
    dispatch(
      actions.findRides({
        groupId: data.group.groupId,
        rideDirection: data.swap ? 1 : 0,
        dateTime: data.date,
      }),
    )
      .then(res => {
        console.log('RES', res);
        setResults(res);
      })
      .catch(err =>
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
        ),
      )
      .finally(() => setLoading(false));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.select}>Select a ride</Text>
        <RidesList
          data={results}
          loading={loading}
          onRefresh={onRefresh}
          onItemPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchResults;
