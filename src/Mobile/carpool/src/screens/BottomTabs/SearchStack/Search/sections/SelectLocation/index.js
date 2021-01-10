import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import {geocodingClient} from '../../../../../../maps/mapbox';
import {colors, sheet} from '../../../../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PointMinimap} from '../../../../../../components/Route';
import {StandardButton} from '../../../../../../components/common/buttons';
import {StartLocationsFlatList} from '../../../../../../components/Driver';
import {parseCoords} from '../../../../../../utils/coords';
import {styles} from './index.styles';

const config = {
  autocomplete: false,
  countries: ['pl'],
};

const SelectLocation = ({onSubmit}) => {
  const [query, setQuery] = useState('');
  const [place, setPlace] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (results.length && !query.length) {
      setResults([]);
    }
  }, [query]);

  const onSearch = () => {
    setLoading(true);
    geocodingClient
      .forwardGeocode({query, ...config})
      .send()
      .then(res => {
        setResults([...res.body.features]);
      })
      .catch(err => {
        console.log('ERR', err);
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
      <Text style={styles.title}>Location</Text>
      {place ? (
        <View style={styles.placeWrapper}>
          <View style={sheet.rowCenter}>
            <Icon name="map-marker" color={colors.green} size={30} />
            <Text style={styles.placeName}>{place.place_name}</Text>
          </View>
          <View style={styles.mapWrapper}>
            <PointMinimap coordinates={parseCoords(place.coordinates)} />
          </View>
          <View style={sheet.rowCenterSplit}>
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
      ) : (
        <>
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
              data={results}
              loading={loading}
              onItemPress={onItemPress}
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
        </>
      )}
    </View>
  );
};

export default SelectLocation;
