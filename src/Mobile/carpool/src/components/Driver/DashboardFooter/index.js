import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {sheet, colors} from '../../../styles';
import NextStop from '../NextStop';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {StandardButton} from '../../common/buttons';
import {
  NEXT_STOP_THERESHOLD,
  parseDistance,
} from '../../../screens/BottomTabs/RidesStack/RideDashboard/utils';
import {styles} from './index.styles';

const DashboardFooter = ({
  waypoints,
  ride,
  stopDistance,
  onArrivedPress,
  isReversed,
}) => {
  const [extended, setExtended] = useState(false);

  // Automatically disapear after 10 seconds
  useEffect(() => {
    let timeout;
    if (extended) {
      timeout = setTimeout(() => {
        setExtended(false);
      }, 10000);
    }

    return () => clearTimeout(timeout);
  }, [extended]);

  const onMorePress = () => setExtended(!extended);

  const renderNextStop = () => {
    // Render waypoint if possible
    if (waypoints.length) {
      return <NextStop location={waypoints[0].location} />;
    }

    // Render location if ride direction is reversed
    if (isReversed) {
      return <NextStop location={ride.location} />;
    }

    // Render group
    return (
      <View style={sheet.rowCenter}>
        <FAIcon name="circle" color={colors.orange} size={12} />
        <Text style={styles.groupName}>{ride.group.name}</Text>
      </View>
    );
  };

  const renderBottom = () => {
    if (stopDistance < NEXT_STOP_THERESHOLD) {
      return (
        <View style={styles.buttonWrapper}>
          <StandardButton
            title="Arrived"
            color={colors.green}
            height={40}
            width={150}
            onPress={onArrivedPress}
          />
        </View>
      );
    }

    if (!extended) {
      return (
        <View style={sheet.center}>
          <TouchableOpacity onPress={onMorePress}>
            <Text style={styles.more}>More</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
        {!!waypoints.length && (
          <View style={styles.passenger}>
            <FAIcon name="map-marker" color={colors.blue} size={24} />
            <Text style={styles.name}>{`${waypoints[0].participant.firstName} ${
              waypoints[0].participant.lastName
            }`}</Text>
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <StandardButton
            title="Arrived"
            color={colors.green}
            height={40}
            width={150}
            onPress={onArrivedPress}
          />
        </View>
        <View style={sheet.center}>
          <TouchableOpacity onPress={onMorePress}>
            <Text style={styles.more}>Less</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={styles.footer}>
      <View style={sheet.rowCenterSplit}>
        <Text style={styles.nextStop}>Next stop</Text>
        <Text style={styles.distance}>{parseDistance(stopDistance)}</Text>
      </View>
      {renderNextStop()}
      {renderBottom()}
    </View>
  );
};

export default DashboardFooter;
