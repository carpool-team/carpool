import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import {colors, sheet} from '../../styles';
import {vh, vw} from '../../utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
import {BlueMarker} from '../../components/common';
import {geocodingClient} from '../../maps/mapbox';
import Geolocation from '@react-native-community/geolocation';
import useForwardGeocoding from '../../hooks/useForwardGeocoding';
import {StartLocationsFlatList} from '../../components/FindRoute';
import GroupsFlatlist from '../../components/GroupsFlatlist';
import DatePicker from 'react-native-date-picker';
import {StandardButton} from '../../components/common/buttons';
import useRequest, {METHODS, ENDPOINTS} from '../../hooks/useRequest';
import {AccountContext} from '../../context/AccountContext';

const config = {
  autocomplete: false,
  countries: ['pl'],
};

const AskForRide = () => {
  const [currentPosition, setCurrentPosition] = useState([]);
  const [start, setStart] = useState(null);
  const [startGeo, setStartGeo] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationGeo, setDestinationGeo] = useState(null);
  const [isStartFocused, setIsStartFocused] = useState(false);
  const [isDestinationFocused, setIsDestinationFocused] = useState(false);
  const [date, setDate] = useState(new Date());

  const navigation = useNavigation();
  const _destination = useRef();
  const requesterId = '8151a9b2-52ee-4ce0-a2dd-08d7f7744d91';

  const [startResults, startLoading] = useForwardGeocoding(start, config, true);

  // Store
  const {
    accountState: {
      groups: {data: groups},
    },
  } = useContext(AccountContext);
  let grps = groups.map(group => ({...group, place_name: group.name}));

  //Requests
  const [response, loading, error, _sendRideRequest] = useRequest(
    METHODS.POST,
    ENDPOINTS.SEND_RIDE_REQUEST(requesterId),
    {
      destination: destinationGeo,
      startingLocation: startGeo,
      date,
    },
  );

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const {longitude, latitude} = info.coords;
      setCurrentPosition([longitude, latitude]);
    });
  }, []);

  useEffect(() => {
    if (response && !loading) {
      navigation.goBack();
    }
  }, [loading, response]);

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
            longitude: result.center[1],
            latitude: result.center[0],
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
        longitude: item.center[1],
        latitude: item.center[0],
      },
      locationName: null,
    };
    setStartGeo(stGeo);
    onFocusDestination();
  };

  const onDestinationItemPress = item => {
    setDestination(item.place_name);
    const dstGeo = {
      coordinates: item.location.coordinates,
      locationName: null,
    };
    setDestinationGeo(dstGeo);
    onBlurDestination();
  };

  const onSubmit = () => {
    _sendRideRequest();
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
          //data={exampleGroups}
          data={grps}
          loading={false}
          onItemPress={onDestinationItemPress}
        />
      );
    } else {
      return startLoading ? (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" color={colors.green} />
        </View>
      ) : (
        <View style={styles.datePickerWrapper}>
          <View>
            <Text style={styles.arrivalTime}>Arrival time</Text>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size="large" color={colors.green} />
              </View>
            ) : (
              <DatePicker
                date={date}
                onDateChange={setDate}
                locale="pl"
                minimumDate={new Date()}
                minuteInterval={10}
              />
            )}
          </View>
          {loading ? null : (
            <StandardButton
              width="65%"
              style={{marginTop: 4 * vh}}
              onPress={onSubmit}
              title="Submit"
              color={colors.green}
            />
          )}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topPanel}>
        <View style={styles.inputWrapper}>
          <BlueMarker size={5 * vw} />
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
                <Icon name="close" color={colors.grayVeryDark} size={6 * vw} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <BlueMarker size={5 * vw} />
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
                <Icon name="close" color={colors.grayVeryDark} size={6 * vw} />
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
    paddingTop: 4 * vh,
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
  inputContainer: {
    flex: 1,
    borderBottomWidth: 0.2 * vh,
    borderColor: colors.grayDark,
    marginLeft: 2 * vw,
    ...sheet.rowCenter,
  },
  input: {
    flex: 1,
    ...sheet.textMedium,
    fontSize: 4 * vw,
    paddingVertical: 0.3 * vh,
    paddingHorizontal: 1 * vw,
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
  datePickerWrapper: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10 * vh,
  },
  arrivalTime: {
    color: colors.grayDark,
    fontSize: 5 * vw,
    ...sheet.textBold,
    textAlign: 'center',
  },
  submit: {
    color: colors.green,
    fontSize: 2.25 * vh,
    ...sheet.textBold,
  },
});

export default AskForRide;
