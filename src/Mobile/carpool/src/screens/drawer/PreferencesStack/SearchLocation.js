import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import colors from '../../../styles/colors';
import {vh, vw} from '../../../utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
import BlueMarker from '../../../components/common/BlueMarker';
import sheet from '../../../styles/sheet';
import LocationsFlatList from '../../../components/LocationsFlatList';
import {geocodingClient} from '../../../maps/mapbox';

let examplePlaces = [];

for (i = 0; i < 20; i++) {
  examplePlaces.push({
    id: Math.random().toString(),
    name: 'Sofoklesa 29',
    city: 'Poznań',
  });
}

const SearchLocation = () => {
  const [place, setPlace] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    isEmpty && setIsEmpty(false);

    results.length && setResults([]);
  }, [place]);

  const _OnSubmit = async () => {
    if (place.length) {
      try {
        setLoading(true);

        const response = await geocodingClient
          .forwardGeocode({
            query: place,
            autocomplete: false,
            types: ['address'],
          })
          .send();

        if (response.statusCode === 200) {
          const {features} = response.body;

          if (features.length === 0) {
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
          }
          setResults(features);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topPanel}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" color={colors.grayVeryDark} size={8 * vw} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <BlueMarker size={5 * vw} />
          <TextInput
            value={place}
            onChangeText={setPlace}
            style={styles.input}
            onSubmitEditing={_OnSubmit}
            autoFocus
            placeholder="Address"
            returnKeyType="search"
          />
        </View>
      </View>
      <View style={styles.resultsContainer}>
        <LocationsFlatList data={results} loading={loading} isEmpty={isEmpty} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topPanel: {
    width: '100%',
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    paddingVertical: 1 * vh,
    paddingHorizontal: 4 * vw,
    alignItems: 'flex-end',
  },
  inputWrapper: {
    width: '100%',
    paddingHorizontal: 8 * vw,
    alignItems: 'center',
    paddingBottom: 2 * vh,
    ...sheet.rowCenter,
  },
  input: {
    flex: 1,
    ...sheet.textMedium,
    marginLeft: 2 * vw,
    borderBottomWidth: 0.2 * vh,
    borderColor: colors.grayDark,
    fontSize: 4 * vw,
    paddingVertical: 0.3 * vh,
    paddingHorizontal: 1 * vw,
    color: colors.grayVeryDark,
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SearchLocation;
