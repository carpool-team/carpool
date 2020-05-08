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
import colors from '../../styles/colors';
import {vh, vw} from '../../utils/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/core';
import BlueMarker from '../../components/common/BlueMarker';
import sheet from '../../styles/sheet';
import {geocodingClient} from '../../maps/mapbox';
import Geolocation from '@react-native-community/geolocation';
import useForwardGeocoding from '../../hooks/useForwardGeocoding';
import StartLocationsFlatList from '../../components/FindRoute/StartLocationsFlatList';
import GroupsFlatlist from '../../components/GroupsFlatlist';
import {exampleGroups} from '../../examples/groups';
import DatePicker from 'react-native-date-picker';
import {StandardButton} from '../../components/common/buttons';

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

  const [startResults, startLoading] = useForwardGeocoding(start, config, true);

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const {longitude, latitude} = info.coords;
      setCurrentPosition([longitude, latitude]);
    });
  }, []);

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
        <GroupsFlatlist
          data={exampleGroups}
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
            <DatePicker
              date={date}
              onDateChange={setDate}
              locale="pl"
              minimumDate={new Date()}
              minuteInterval={10}
            />
          </View>
          <StandardButton
            width="65%"
            style={{marginTop: 4 * vh}}
            onPress={() => navigation.goBack()}
            title="Submit"
            color={colors.green}
          />
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
