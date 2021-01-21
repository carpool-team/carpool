import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {sheet, colors} from '../../../styles';
import {parseDistance} from '../../../screens/BottomTabs/RidesStack/RideDashboard/utils';
import {styles} from './index.styles';
import {useReverseGeocoding} from '../../../hooks';
import {parseCoords} from '../../../utils/coords';

const DashboardFooter = ({destination, distance}) => {
  const [placeName, setPlaceName] = useState(null);

  const [results, loading, error, _getPlaceName] = useReverseGeocoding();

  useEffect(() => {
    if (destination) {
      _getPlaceName(parseCoords(destination.coordinates));
    }
  }, [destination]);

  useEffect(() => {
    if (results) {
      results.body.features.length &&
        setPlaceName(results.body.features[0].place_name);
    }
  }, [results]);

  console.log(placeName);

  return (
    <View style={styles.footer}>
      <Text style={styles.nextStop}>Destination</Text>
      <View style={sheet.rowCenterSplit}>
        {loading || !placeName ? (
          <ActivityIndicator size="small" color={colors.green} />
        ) : (
          <Text style={styles.placeName}>{placeName}</Text>
        )}
        <Text style={styles.distance}>{parseDistance(distance)}</Text>
      </View>
    </View>
  );
};

export default DashboardFooter;
