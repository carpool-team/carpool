import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {sheet, colors} from '../../../styles';
import {
  GO_BACK_THERESHOLD,
  NEW_ROUTE_THERESHOLD,
  icons,
  parseDistance,
} from '../../../screens/BottomTabs/RidesStack/RideDashboard/utils';
import {styles} from './index.styles';

const DashboardHeader = ({distance, stops, steps, stepDistance}) => {
  if (distance > GO_BACK_THERESHOLD) {
    return (
      <View style={styles.header}>
        <View style={sheet.rowCenter}>
          <Ionicon name="warning" color={colors.grayDark} size={24} />
          <Text style={styles.goBack}>Go back to the route!</Text>
        </View>
      </View>
    );
  }
  if (distance > NEW_ROUTE_THERESHOLD) {
    return (
      <View style={styles.header}>
        <View style={sheet.rowCenter}>
          <ActivityIndicator color={colors.grayDark} size="small" />
          <Text style={styles.fetching}>Fetching new route...</Text>
        </View>
      </View>
    );
  }

  if (!stops.length || !steps.length) {
    return (
      <View style={styles.header}>
        <View style={sheet.rowCenter}>
          <Text style={styles.success}>
            You have successfully reached your destination!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <View style={styles.content}>
        <View style={styles.row}>
          {icons[
            steps[0].maneuver.modifier ? steps[0].maneuver.modifier : 'default'
          ]()}
          <Text style={styles.step}>{steps[0].maneuver.instruction}</Text>
        </View>
        {stepDistance > 10 ? (
          <Text style={styles.stepDistance}>{parseDistance(stepDistance)}</Text>
        ) : (
          <Text style={styles.stepDistance}>0 m</Text>
        )}
      </View>
    </View>
  );
};

export default DashboardHeader;
