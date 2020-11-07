import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UpView from '../../../common/UpView';
import sheet from '../../../../styles/sheet';
import colors from '../../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

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
        <Text
          style={
            styles.since
          }>{`Since ${new Date().toLocaleDateString()}`}</Text>
      </View>
      <View style={styles.bottomRow}>
        <View style={sheet.rowCenter}>
          <Icon name="group" size={40} color={colors.grayDark} />
          <Text style={styles.members}>{item.userCount}</Text>
        </View>
        <View style={sheet.rowCenter}>
          <Ionicon name="ios-car" size={40} color={colors.grayDark} />
          <Text style={styles.rides}>{item.rideCount}</Text>
        </View>
        <View style={sheet.rowCenter}>
          <Ionicon name="md-git-branch" size={40} color={colors.grayDark} />
          <Text style={styles.distance}>{`123 km`}</Text>
        </View>
      </View>
    </View>
  </UpView>
);

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 160,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    ...sheet.textSemiBold,
    fontSize: 22,
    color: colors.grayVeryDark,
  },
  since: {
    ...sheet.textRegular,
    fontSize: 14,
    color: colors.grayDark,
    marginTop: 4,
  },
  members: {
    ...sheet.textSemiBold,
    fontSize: 20,
    marginLeft: 8,
    color: colors.blue,
  },
  rides: {
    ...sheet.textSemiBold,
    fontSize: 20,
    marginLeft: 8,
    color: colors.green,
  },
  distance: {
    ...sheet.textSemiBold,
    fontSize: 20,
    marginLeft: 8,
    color: colors.orange,
  },
  topWrapper: {
    width: '100%',
  },
  bottomRow: {
    ...sheet.rowCenterSplit,
    width: '100%',
  },
});

export default ListItem;
