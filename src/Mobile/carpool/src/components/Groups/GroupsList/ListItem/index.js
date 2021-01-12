import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UpView from '../../../common/UpView';
import sheet from '../../../../styles/sheet';
import colors from '../../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {styles} from './index.styles';

const ListItem = ({item, onItemPress}) => (
  <UpView
    onPress={() => onItemPress(item)}
    borderRadius={16}
    style={styles.card}>
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <View style={styles.bottomRow}>
        <View style={sheet.rowCenter}>
          <Icon name="group" size={32} color={colors.grayDark} />
          <Text style={styles.members}>
            {item.userCount ? item.userCount : 0}
          </Text>
        </View>
        <View style={sheet.rowCenter}>
          <Ionicon name="ios-car" size={32} color={colors.grayDark} />
          <Text style={styles.rides}>
            {item.rideCount ? item.rideCount : 0}
          </Text>
        </View>
      </View>
    </View>
  </UpView>
);

export default ListItem;
