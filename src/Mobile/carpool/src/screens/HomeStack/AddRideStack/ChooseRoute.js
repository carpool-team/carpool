import React, {useState, useRef, useContext, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {StartLocationsFlatList} from '../../../components/FindRoute';
import Geolocation from '@react-native-community/geolocation';
import {BlueMarker} from '../../../components/common/map';
import {colors, sheet} from '../../../styles';
import {geocodingClient} from '../../../maps/mapbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StandardButton} from '../../../components/common/buttons';
import {RouteMinimap} from '../../../components/Route';
import {AddRideContext, AddRideContextActions} from './context';
import {useSelector} from 'react-redux';
import {GroupsFlatlist} from '../../../components/Locations';

const config = {
  autocomplete: false,
  countries: ['pl'],
};

const ChooseRoute = ({navigation}) => {
  const [currentPosition, setCurrentPosition] = useState([]);
  const [start, setStart] = useState(null);
  const [startGeo, setStartGeo] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationGeo, setDestinationGeo] = useState(null);
  const [isStartFocused, setIsStartFocused] = useState(false);
  const [isDestinationFocused, setIsDestinationFocused] = useState(false);
  const [groupId, setGroupId] = useState(null);

  const _destination = useRef();

  // Geocoding
  const [startResults, startLoading] = useForwardGeocoding(start, config, true);

  // Store
  const groups = useSelector(state => state.accountReducer.groups);

  let grps = groups.data
    ? groups.data.map(group => ({...group, place_name: group.name}))
    : [];

  const {addRideState, dispatch: addRideDispatch} = useContext(AddRideContext);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const {longitude, latitude} = info.coords;
      setCurrentPosition([longitude, latitude]);
    });
  }, []);

  useEffect(() => {
    if (addRideState.startingLocation && addRideState.groupId) {
      navigation.navigate('PickTime');
    }
  }, [addRideState]);

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
        const stGeo = {
          coordinates: {
            longitude: result.center[0],
            latitude: result.center[1],
          },
          locationName: null,
        };
        setStartGeo(stGeo);
        onFocusDestination();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onStartItemPress = item => {
    setStart(item.place_name);
    const stGeo = {
      coordinates: {
        longitude: item.center[0],
        latitude: item.center[1],
      },
      locationName: null,
    };
    setStartGeo(stGeo);
    onFocusDestination();
  };

  const onDestinationItemPress = item => {
    setDestination(item.place_name);
    const dstGeo = {
      coordinates: item.location,
      locationName: null,
    };
    setGroupId(item.id);
    setDestinationGeo(dstGeo);
    onBlurDestination();
  };

  const onSubmit = () => {
    addRideDispatch({
      type: AddRideContextActions.SET_STARTING_LOCATION,
      payload: startGeo,
    });
    addRideDispatch({
      type: AddRideContextActions.SET_GROUP_ID,
      payload: groupId,
    });
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
        <GroupsFlatlist
          data={grps}
          loaidng={groups.loading}
          onItemPress={onDestinationItemPress}
        />
      );
    } else {
      return startLoading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color={colors.green} />
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <RouteMinimap stops={[startGeo, destinationGeo]} />
          <StandardButton
            style={{marginTop: 36}}
            width="65%"
            onPress={onSubmit}
            title="Next"
            color={colors.blue}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topPanel}>
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
              onSubmitEditing={() => null}
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
    paddingTop: 36,
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
  loadingWrapper: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 36,
  },
});

export default ChooseRoute;
