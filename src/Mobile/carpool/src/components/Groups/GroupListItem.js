import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UpView from '../common/UpView';
import {vw, vh} from '../../utils/constants';
import sheet from '../../styles/sheet';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

const GroupListItem = ({item, onItemPress}) => {
  return (
    <UpView
      onPress={() => onItemPress(item)}
      borderRadius={4 * vw}
      style={styles.card}>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
          }}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text
            style={
              styles.since
            }>{`Since ${new Date().toLocaleDateString()}`}</Text>
        </View>
        <View style={{...sheet.rowCenterSplit, width: '100%'}}>
          <View style={sheet.rowCenter}>
            <Icon name="group" size={10 * vw} color={colors.grayDark} />
            <Text style={styles.members}>{item.userCount}</Text>
          </View>
          <View style={sheet.rowCenter}>
            <Ionicon name="ios-car" size={10 * vw} color={colors.grayDark} />
            <Text style={styles.rides}>{item.rideCount}</Text>
          </View>
          <View style={sheet.rowCenter}>
            <Ionicon
              name="md-git-branch"
              size={10 * vw}
              color={colors.grayDark}
            />
            <Text style={styles.distance}>{`123 km`}</Text>
          </View>
        </View>
      </View>
    </UpView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 20 * vh,
    marginBottom: 4 * vh,
  },
  container: {
    flex: 1,
    paddingTop: 2 * vh,
    paddingBottom: 3 * vh,
    paddingHorizontal: 5 * vw,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    ...sheet.textSemiBold,
    fontSize: 5 * vw,
    color: colors.grayVeryDark,
  },
  since: {
    ...sheet.textRegular,
    fontSize: 3.5 * vw,
    color: colors.grayDark,
  },
  members: {
    ...sheet.textSemiBold,
    fontSize: 5 * vw,
    marginLeft: 2 * vw,
    color: colors.blue,
  },
  rides: {
    ...sheet.textSemiBold,
    fontSize: 5 * vw,
    marginLeft: 2 * vw,
    color: colors.green,
  },
  distance: {
    ...sheet.textSemiBold,
    fontSize: 5 * vw,
    marginLeft: 2 * vw,
    color: colors.orange,
  },
});

export default GroupListItem;
