import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './index.styles';
import {getColor} from '../../RideRequests/DriversRideRequests/ListItem/utils';

const RideMatching = ({matching}) => {
  const textStyle = {color: getColor(matching), ...styles.text};
  const barStyle = {
    backgroundColor: getColor(matching),
    // width: matching < 90 ? `${100 - matching}%` : '10%',
    width: matching > 100 ? '100%' : `${matching}%`,
    ...styles.bar,
  };

  const getLabel = () => {
    if (matching < 15) {
      return 'Perfect matching!';
    }
    if (matching < 30) {
      return 'Great matching';
    }
    if (matching < 50) {
      return 'Good matching';
    }
    if (matching < 75) {
      return 'Mediocre matching';
    }

    if (matching < 100) {
      return 'Bad matching';
    }

    return 'Terrible matching';
  };

  const label = getLabel();

  return (
    <>
      <Text style={textStyle}>{label}</Text>
      <View style={styles.progressBar}>
        <View style={barStyle} />
      </View>
    </>
  );
};

export default RideMatching;
