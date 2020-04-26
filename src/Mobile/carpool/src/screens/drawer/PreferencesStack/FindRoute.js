import React, {useState, useEffect, useRef} from 'react';
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
import Geolocation from '@react-native-community/geolocation';
import useForwardGeocoding from '../../../hooks/useForwardGeocoding';

const FindRoute = () => {
  const [currentPosition, setCurrentPosition] = useState([]);
  const [start, setStart] = useState(null);
  const [destination, setDestination] = useState(null);
  const [locationResults, setLocationResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const navigation = useNavigation();

  const _start = useRef();
  const _destination = useRef();

  const [
    startResults,
    startLoading,
    startError,
    onStartSearch,
  ] = useForwardGeocoding(
    start,
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
    console.log('RESULTS ', startResults);
    console.log('LOADING ', startLoading);
    console.log('ERROR ', startError);
  }, [startResults, startLoading, startError]);

  const onFocusDestination = () => {
    const {current} = _destination;

    current && current.focus();
  };

  const onCurrentClick = async () => {
    if (currentPosition.length) {
      try {
        setLoading(true);

        const response = await geocodingClient
          .reverseGeocode({
            query: currentPosition,
          })
          .send();

        const result = response.body.features[0];
        setLocationResults([result]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <View style={styles.topPanel}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" color={colors.grayVeryDark} size={8 * vw} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <BlueMarker size={5 * vw} />
          <TextInput
            ref={_start}
            value={start}
            onChangeText={setStart}
            style={styles.input}
            onSubmitEditing={onFocusDestination}
            autoFocus
            placeholder="From"
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputWrapper}>
          <BlueMarker size={5 * vw} />
          <TextInput
            ref={_destination}
            value={destination}
            onChangeText={setDestination}
            style={styles.input}
            onSubmitEditing={() => null}
            placeholder="To"
            returnKeyType="search"
          />
        </View>
      </View>
      <View style={styles.resultsContainer}>
        <LocationsFlatList
          data={startResults}
          loading={startLoading}
          isEmpty={isEmpty}
          _onItemPress={console.log}
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
    paddingVertical: 1 * vh,
    paddingHorizontal: 4 * vw,
    alignItems: 'flex-end',
  },
  inputWrapper: {
    width: '100%',
    paddingHorizontal: 8 * vw,
    alignItems: 'center',
    paddingBottom: 2 * vh,
    marginVertical: 0.5 * vh,
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

export default FindRoute;
