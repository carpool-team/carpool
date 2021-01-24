import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import {geocodingClient} from '../../../../../../maps/mapbox';
import {colors} from '../../../../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PointMinimap} from '../../../../../../components/Route';
import {StandardButton} from '../../../../../../components/common/buttons';
import {StartLocationsFlatList} from '../../../../../../components/Driver';
import {parseCoords} from '../../../../../../utils/coords';
import {styles} from './index.styles';
import Geolocation from 'react-native-geolocation-service';
import {FullScreenLoading} from '../../../../../../components/common/loaders';

const config = {
  autocomplete: false,
  countries: ['pl'],
};

const SelectLocation = ({onSubmit, swap}) => {
  const [query, setQuery] = useState('');
  const [place, setPlace] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setLocation(parseCoords(pos.coords));
        setLocationLoading(false);
      },
      err =>
        Alert.alert('Error', err.message, [
          {
            text: 'Ok',
            style: 'default',
            onPress: () => navigation.goBack(),
          },
        ]),
      {
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  useEffect(() => {
    if (results.length && !query.length) {
      setResults([]);
    }
  }, [query]);

  const onSearch = () => {
    setLoading(true);
    geocodingClient
      .forwardGeocode({query, ...config, proximity: location})
      .send()
      .then(res => {
        setResults([...res.body.features]);
      })
      .catch(err => {
        Alert.alert(
          'Error',
          'An error ocurred when trying to get location. Please try again.',
          [
            {
              text: 'Ok',
              style: 'default',
            },
          ],
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onItemPress = item => {
    const stGeo = {
      coordinates: {
        longitude: item.center[0],
        latitude: item.center[1],
      },
      place_name: item.place_name,
    };
    setPlace(stGeo);
  };

  const onChangePress = () => {
    setQuery('');
    setPlace(null);
  };

  const onConfirmPress = () => onSubmit(place);

  const onReset = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <View style={styles.container}>
      {!place && (
        <Text style={styles.title}>
          {swap === undefined
            ? 'Select location'
            : swap
            ? 'Select location that you would like to be dropped off at'
            : 'Select location that you would like to be picked up from'}
        </Text>
      )}
      {place ? (
        <View style={styles.placeWrapper}>
          <View style={styles.placeNameWrapper}>
            <Icon name="map-marker" color={colors.green} size={30} />
            <Text style={styles.placeName}>{place.place_name}</Text>
          </View>
          <View style={styles.mapWrapper}>
            <PointMinimap coordinates={parseCoords(place.coordinates)} />
          </View>
          <View style={styles.buttonsWrapper}>
            <StandardButton
              width="45%"
              color={colors.red}
              onPress={onChangePress}
              title="Change"
            />
            <StandardButton
              width="45%"
              color={colors.green}
              onPress={onConfirmPress}
              title="Confirm"
            />
          </View>
        </View>
      ) : locationLoading ? (
        <FullScreenLoading />
      ) : (
        <View style={styles.mainWrapper}>
          <TextInput
            returnKeyType="done"
            autoFocus
            value={query}
            onChangeText={setQuery}
            style={styles.input}
            onSubmitEditing={onSearch}
          />
          <View style={styles.listWrapper}>
            <StartLocationsFlatList
              data={results.slice(0, 3)}
              loading={loading}
              onItemPress={onItemPress}
              userLocation={location}
            />
            <View style={styles.buttonWrapper}>
              {results.length ? (
                <StandardButton
                  color={colors.red}
                  title="Reset"
                  onPress={onReset}
                />
              ) : (
                <StandardButton
                  color={colors.blue}
                  title="Search"
                  onPress={onSearch}
                />
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SelectLocation;
