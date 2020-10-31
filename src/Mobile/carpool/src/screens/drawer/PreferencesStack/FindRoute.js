import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {colors, sheet} from '../../../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
import {BlueMarker} from '../../../components/common';
import {geocodingClient, directionsClient} from '../../../maps/mapbox';
import Geolocation from '@react-native-community/geolocation';
import useForwardGeocoding from '../../../hooks/useForwardGeocoding';
import {
  DestinationLocationsFlatList,
  StartLocationsFlatList,
} from '../../../components/FindRoute';
import {StandardButton} from '../../../components/common/buttons';

const config = {
  autocomplete: false,
  countries: ['pl'],
};

const FindRoute = () => {
  const [currentPosition, setCurrentPosition] = useState([]);
  const [start, setStart] = useState(null);
  const [startGeo, setStartGeo] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationGeo, setDestinationGeo] = useState(null);
  const [isStartFocused, setIsStartFocused] = useState(false);
  const [isDestinationFocused, setIsDestinationFocused] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const _destination = useRef();

  const [startResults, startLoading] = useForwardGeocoding(start, config, true);
  const [destinationResults, destinationLoading] = useForwardGeocoding(
    destination,
    config,
    true,
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const {longitude, latitude} = info.coords;
      setCurrentPosition([longitude, latitude]);
    });
  }, []);

  useEffect(() => {
    if (routes.length) {
      navigation.navigate('ShowRoute', {
        routes,
        start: startGeo,
        destination: destinationGeo,
      });
    }
  }, [routes]);

  const onFocusDestination = () => {
    const {current} = _destination;
    current && current.focus();
  };

  const onBlurDestination = () => {
    const {current} = _destination;
    current && current.blur();
  };

  const onCurrentClick = async () => {
    if (currentPosition.length) {
      try {
        const response = await geocodingClient
          .reverseGeocode({
            query: currentPosition,
          })
          .send();

        const result = response.body.features[0];
        setStart(result.place_name);
        setStartGeo(result);
        onFocusDestination();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onFindRoute = async () => {
    try {
      setLoading(true);
      const response = await directionsClient
        .getDirections({
          profile: 'driving-traffic',
          waypoints: [
            {
              coordinates: startGeo.center,
            },
            {
              coordinates: destinationGeo.center,
            },
          ],
          overview: 'full',
          geometries: 'geojson',
          alternatives: true,
          //steps: true,
        })
        .send();

      setRoutes(response.body.routes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onStartItemPress = item => {
    setStart(item.place_name);
    setStartGeo(item);
    onFocusDestination();
  };

  const onDestinationItemPress = item => {
    setDestination(item.place_name);
    setDestinationGeo(item);
    onBlurDestination();
  };

  const renderList = () => {
    if (isStartFocused) {
      return (
        <StartLocationsFlatList
          data={startResults}
          loading={startLoading}
          onItemPress={onStartItemPress}
          onCurrentClick={onCurrentClick}
        />
      );
    } else if (isDestinationFocused) {
      return (
        <DestinationLocationsFlatList
          data={destinationResults}
          loading={destinationLoading}
          onItemPress={onDestinationItemPress}
        />
      );
    } else {
      return (
        <View
          style={{
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loading ? (
            <ActivityIndicator size="large" color={colors.green} />
          ) : (
            <StandardButton
              width="65%"
              onPress={onFindRoute}
              color={colors.blue}
              title="Search"
            />
          )}
        </View>
      );
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
            <Icon name="close" color={colors.grayVeryDark} size={32} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <BlueMarker size={20} />
          <View style={styles.inputContainer}>
            <TextInput
              value={start}
              onChangeText={setStart}
              style={styles.input}
              onSubmitEditing={onFocusDestination}
              autoFocus
              placeholder="From"
              returnKeyType="next"
              onFocus={() => setIsStartFocused(true)}
              onBlur={() => setIsStartFocused(false)}
            />
            {startGeo && isStartFocused ? (
              <TouchableOpacity
                onPress={() => {
                  setStart(null);
                  setStartGeo(null);
                }}>
                <Icon name="close" color={colors.grayVeryDark} size={24} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <BlueMarker size={20} />
          <View style={styles.inputContainer}>
            <TextInput
              ref={_destination}
              value={destination}
              onChangeText={setDestination}
              style={styles.input}
              onSubmitEditing={onFindRoute}
              placeholder="To"
              returnKeyType="done"
              onFocus={() => setIsDestinationFocused(true)}
              onBlur={() => setIsDestinationFocused(false)}
            />
            {destinationGeo && isDestinationFocused ? (
              <TouchableOpacity
                onPress={() => {
                  setDestination(null);
                  setDestinationGeo(null);
                }}>
                <Icon name="close" color={colors.grayVeryDark} size={24} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.resultsContainer}>{renderList()}</View>
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
    marginVertical: 5,
    ...sheet.rowCenter,
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: colors.grayDark,
    marginLeft: 8,
    ...sheet.rowCenter,
  },
  input: {
    flex: 1,
    ...sheet.textMedium,
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

export default FindRoute;
