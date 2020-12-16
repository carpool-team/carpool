import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors, sheet} from '../../../../../styles';
import {UpView} from '../../../../../components/common';
import {useReverseGeocoding} from '../../../../../hooks';
import {parseCoords} from '../../../../../utils/coords';
import {AddRideActions} from '../../reducer';

const SelectDirection = ({state, dispatch}) => {
  const [placeName, setPlaceName] = useState(null);

  const {group} = state;

  const [results, loading, error, _getPlaceName] = useReverseGeocoding();

  useEffect(() => {
    _getPlaceName(parseCoords(group.location));
  }, []);

  useEffect(() => {
    if (results) {
      results.body.features.length &&
        setPlaceName(results.body.features[0].place_name);
    }
  }, [results]);

  const onItemPress = swap => {
    dispatch({type: AddRideActions.SET_SWAP, payload: swap});
  };

  return (
    !!group && (
      <View style={styles.container}>
        <Text style={styles.title}>Select direction</Text>
        <Text style={styles.info}>I want to ride</Text>
        <View style={sheet.rowCenterSplit}>
          <UpView
            onPress={() => onItemPress(false)}
            borderRadius={12}
            style={styles.upview}
            contentContainerStyle={styles.contentContainer}>
            <Text style={styles.direction}>To</Text>
          </UpView>
          <UpView
            onPress={() => onItemPress(true)}
            borderRadius={12}
            style={styles.upview}
            contentContainerStyle={styles.contentContainer}>
            <Text style={styles.direction}>From</Text>
          </UpView>
        </View>
        <Text style={styles.name}>{group.name}</Text>
        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="small" color={colors.blue} />
          </View>
        ) : (
          <View style={sheet.rowCenter}>
            <Icon name="map-marker" color={colors.green} size={30} />
            <Text style={styles.placeName}>{placeName}</Text>
          </View>
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    color: colors.orange,
    ...sheet.textSemiBold,
    marginBottom: 50,
  },
  info: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 20,
    marginBottom: 20,
  },
  upview: {
    height: 80,
    width: '46%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  direction: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 24,
  },
  name: {
    ...sheet.textMedium,
    color: colors.grayDark,
    fontSize: 32,
    marginTop: 20,
  },
  placeName: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    fontSize: 16,
    marginTop: 8,
    marginLeft: 10,
  },
  center: {
    alignItems: 'center',
    width: '100%',
  },
});

export default SelectDirection;
