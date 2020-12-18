import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {GoBack} from '../../../../components/navigation';

const SearchResults = ({navigation, route}) => {
  const [results, setResults] = useState(route.params.results);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
    });
  }, []);

  console.log(results);

  return (
    <View>
      <Text>Results</Text>
    </View>
  );
};

export default SearchResults;
