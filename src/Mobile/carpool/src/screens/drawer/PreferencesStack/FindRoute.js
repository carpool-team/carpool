import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import colors from '../../../styles/colors';
import {vh, vw} from '../../../utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
import BlueMarker from '../../../components/common/BlueMarker';
import sheet from '../../../styles/sheet';
import {geocodingClient, directionsClient} from '../../../maps/mapbox';
import Geolocation from '@react-native-community/geolocation';
import useForwardGeocoding from '../../../hooks/useForwardGeocoding';
import UpView from '../../../components/common/UpView';
import StartLocationsFlatList from '../../../components/FindRoute/StartLocationsFlatList';
import DestinationLocationsFlatList from '../../../components/FindRoute/DestinationLocationsFlatList';

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
  const [route, setRoute] = useState(null);
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
    if (route) {
      navigation.navigate('ShowRoute', {
        route,
        start: startGeo,
        destination: destinationGeo,
      });
    }
  }, [route]);

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
          //steps: true,
        })
        .send();

      setRoute(response.body.routes[0]);
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
            <UpView
              style={{width: '65%', height: 6 * vh}}
              borderRadius={100}
              contentContainerStyle={sheet.center}
              onPress={onFindRoute}>
              <Text
                style={{
                  color: colors.blue,
                  fontSize: 2.25 * vh,
                  ...sheet.textBold,
                }}>
                Search
              </Text>
            </UpView>
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
            <Icon name="close" color={colors.grayVeryDark} size={8 * vw} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputWrapper}>
          <BlueMarker size={5 * vw} />
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
        </View>
        <View style={styles.inputWrapper}>
          <BlueMarker size={5 * vw} />
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
