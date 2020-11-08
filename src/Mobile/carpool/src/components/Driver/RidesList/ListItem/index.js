import React from 'react';
import {View, Text} from 'react-native';
import {UpView} from '../../../common';
import {colors} from '../../../../styles';
import {CircleButton} from '../../../common/buttons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {parseCoords} from '../../../../utils/coords';
import {styles} from './index.styles';
import {getLeavingIn} from './utils';
import {Waypoints} from '../../../Ride';

const ListItem = ({item, onItemPress}) => (
  <UpView
    onPress={() => onItemPress(item)}
    borderRadius={16}
    style={styles.upview}>
    <View style={styles.container}>
      <View style={styles.topRow}>
        <CircleButton
          style={styles.circleButton}
          icon={<Ionicon name="ios-car" color={colors.grayDark} size={32} />}
        />
        <View style={styles.column}>
          <Text style={styles.singleRide}>Single ride</Text>
          <Text style={styles.leavingIn}>{getLeavingIn(item.date)}</Text>
        </View>
      </View>
      <Waypoints
        ride={item}
        start={parseCoords(item.startingLocation.coordinates)}
      />
    </View>
  </UpView>
);

export default ListItem;
