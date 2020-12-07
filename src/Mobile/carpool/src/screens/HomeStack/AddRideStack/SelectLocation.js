import React, {useState, useContext, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {AddRideContext, AddRideContextActions} from './context';
import {useForwardGeocoding} from '../../../hooks';
import {StartLocationsFlatList} from '../../../components/FindRoute';
import {colors, sheet} from '../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StandardButton} from '../../../components/common/buttons';
import {RouteMinimap} from '../../../components/Route';

const config = {
  autocomplete: false,
  countries: ['pl'],
};

const SelectLocation = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [place, setPlace] = useState(null);

  // Refs
  const _input = useRef();

  // Context
  const {addRideState, dispatch} = useContext(AddRideContext);
  const {swap, group, location} = addRideState;

  // Geocoding
  const [results, loading] = useForwardGeocoding(query, config, true);

  console.log('RESULTS', results);

  useEffect(() => {
    if (place) {
      const {current} = _input;
      current && current.blur();
    }
  }, [place]);

  useEffect(() => {
    location && navigation.navigate('PickTime');
  }, [location]);

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

  const onConfirmPress = () =>
    dispatch({type: AddRideContextActions.SET_LOCATION, payload: place});

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {swap ? 'Destination' : 'Starting location'}
        </Text>
        {place ? (
          <View style={styles.placeWrapper}>
            <View style={sheet.rowCenter}>
              <Icon name="map-marker" color={colors.green} size={30} />
              <Text style={styles.placeName}>{place.place_name}</Text>
            </View>
            <View style={styles.mapWrapper}>
              <RouteMinimap
                stops={
                  swap
                    ? [{coordinates: group.location}, place]
                    : [place, {coordinates: group.location}]
                }
              />
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
              ref={_input}
              returnKeyType="done"
              autoFocus
              value={query}
              onChangeText={setQuery}
              style={styles.input}
            />
            <View style={styles.listWrapper}>
              <StartLocationsFlatList
                data={results}
                loading={loading}
                onItemPress={onItemPress}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 30,
    color: colors.orange,
    ...sheet.textSemiBold,
  },
  placeWrapper: {
    flex: 1,
    paddingTop: 30,
  },
  placeName: {
    ...sheet.textSemiBold,
    marginLeft: 12,
    color: colors.grayDark,
    fontSize: 18,
  },
  mapWrapper: {
    width: '100%',
    flex: 1,
    marginTop: 16,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: colors.grayDark,
    paddingVertical: 8,
    ...sheet.textMedium,
    fontSize: 18,
    color: colors.grayVeryDark,
  },
  listWrapper: {
    flex: 1,
    width: '100%',
  },
});

export default SelectLocation;
