import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {parseCoords} from '../../../../../../utils/coords';
import {colors, sheet} from '../../../../../../styles';
import {UpView} from '../../../../../../components/common';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useReverseGeocoding} from '../../../../../../hooks';
import {styles} from './index.styles';

const SelectDirection = ({onSubmit, state}) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select direction</Text>
      <Text style={styles.info}>I want to ride</Text>
      <View style={sheet.rowCenterSplit}>
        <UpView
          onPress={() => onSubmit(false)}
          borderRadius={12}
          style={styles.upview}
          contentContainerStyle={styles.contentContainer}>
          <Text style={styles.direction}>To</Text>
        </UpView>
        <UpView
          onPress={() => onSubmit(true)}
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
  );
};

export default SelectDirection;
