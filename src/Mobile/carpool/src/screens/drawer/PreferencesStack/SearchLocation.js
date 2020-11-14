import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {colors, sheet} from '../../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
import {BlueMarker} from '../../../components/common/map';
import {geocodingClient} from '../../../maps/mapbox';
import Geolocation from '@react-native-community/geolocation';
import useForwardGeocoding from '../../../hooks/useForwardGeocoding';
import {LocationsFlatList} from '../../../components/Locations';

const SearchLocation = () => {
  const [currentPosition, setCurrentPosition] = useState([]);
  const [place, setPlace] = useState('');
  const [results, setResults] = useState([]);

  const navigation = useNavigation();

  const [features, loading, error, onSearch] = useForwardGeocoding(
    place,
    {
      autocomplete: false,
      countries: ['pl'],
    },
    true,
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const {longitude, latitude} = info.coords;
      setCurrentPosition([longitude, latitude]);
    });
  }, []);

  useEffect(() => {
    setResults(features);
  }, [features]);

  const onCurrentClick = async () => {
    if (currentPosition.length) {
      try {
        const response = await geocodingClient
          .reverseGeocode({
            query: currentPosition,
          })
          .send();

        const result = response.body.features[0];
        setResults([result]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topPanel}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" color={colors.grayVeryDark} size={32} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <BlueMarker size={20} />
          <TextInput
            value={place}
            onChangeText={setPlace}
            style={styles.input}
            onSubmitEditing={onSearch}
            autoFocus
            placeholder="Address"
            returnKeyType="search"
          />
        </View>
      </View>
      <View style={styles.resultsContainer}>
        <LocationsFlatList
          data={results}
          loading={loading}
          _onCurrentClick={onCurrentClick}
        />
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
    paddingVertical: 9,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  inputWrapper: {
    width: '100%',
    paddingHorizontal: 32,
    alignItems: 'center',
    paddingBottom: 18,
    ...sheet.rowCenter,
  },
  input: {
    flex: 1,
    ...sheet.textMedium,
    marginLeft: 8,
    borderBottomWidth: 2,
    borderColor: colors.grayDark,
    fontSize: 16,
    paddingVertical: 3,
    paddingHorizontal: 4,
    color: colors.grayVeryDark,
  },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SearchLocation;
