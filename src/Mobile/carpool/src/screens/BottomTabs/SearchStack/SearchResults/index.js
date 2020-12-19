import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Alert,
  StyleSheet,
} from 'react-native';
import {GoBack} from '../../../../components/navigation';
import {ListEmptyComponent} from '../../../../components/common/lists';
import * as actions from '../../../../store/actions';
import {useDispatch} from 'react-redux';
import {colors} from '../../../../styles';

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
        <FlatList
          style={styles.flatlist}
          contentContainerStyle={styles.contentContainer}
          data={results}
          keyExtractor={({item}) => item.id}
          renderItem={item => <Text>{item.toString()}</Text>}
          refreshControl={
            <RefreshControl
              colors={[colors.blue]}
              tintColor={colors.blue}
              refreshing={loading}
              onRefresh={onRefresh}
            />
          }
          ListEmptyComponent={
            !loading && <ListEmptyComponent title="No rides were found." />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  flatlist: {
    paddingTop: 32,
  },
  contentContainer: {
    flex: 1,
  },
});

export default SearchResults;
