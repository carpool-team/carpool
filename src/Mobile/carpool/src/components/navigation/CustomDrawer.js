import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {vw, vh} from '../../utils/constants';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import sheet from '../../styles/sheet';
import UpView from '../common/UpView';

export default CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props} style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.userInfoContainer}>
            <UpView
              style={styles.avatarCircle}
              contentContainerStyle={sheet.center}
              borderRadius={9999}>
              <Icon name="user" color={colors.grayDark} size={10 * vw} />
            </UpView>
            <View style={styles.userDataWrapper}>
              <Text style={styles.username}>John</Text>
              <View style={sheet.rowCenter}>
                <Text style={styles.rating}>5.00</Text>
                <Icon
                  name="star"
                  size={8 * vw}
                  color={colors.yellow}
                  style={{marginLeft: 2 * vw}}
                />
              </View>
            </View>
          </View>
          <View style={styles.rideInfoContainer}>
            <Text style={styles.upcomingRide}>Upcoming ride</Text>
            <UpView
              style={styles.rideCard}
              contentContainerStyle={styles.rideCardContent}
              borderRadius={4 * vw}
              onPress={() => null}>
              <Text style={styles.driversName}>Jonathan</Text>
              <Text style={styles.leaving}>Leaving in 6 minutes</Text>
            </UpView>
          </View>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomContainer}>
        <UpView
          style={{width: '65%', height: 6 * vh}}
          borderRadius={100}
          contentContainerStyle={sheet.center}
          onPress={() => console.log('ELOELO')}>
          <Text style={styles.logout}>Logout</Text>
        </UpView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3 * vh,
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.1 * vh,
  },
  avatarCircle: {
    width: 18 * vw,
    height: 18 * vw,
  },
  userDataWrapper: {
    height: 18 * vw,
    flex: 1,
    paddingLeft: 4 * vw,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 5 * vw,
    color: colors.blue,
    ...sheet.textSemiBold,
  },
  rating: {
    color: colors.grayDark,
    fontSize: 5 * vw,
    ...sheet.textSemiBold,
  },
  rideInfoContainer: {
    paddingHorizontal: 16,
    paddingTop: 2 * vh,
    paddingBottom: 4 * vh,
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.1 * vh,
  },
  upcomingRide: {
    fontSize: 4.5 * vw,
    color: colors.green,
    ...sheet.textMedium,
    marginBottom: 2 * vh,
  },
  rideCard: {
    width: '100%',
    height: 10 * vh,
  },
  rideCardContent: {
    paddingVertical: 1.5 * vh,
    paddingHorizontal: 4 * vw,
    justifyContent: 'space-between',
  },
  driversName: {
    ...sheet.textBold,
    fontSize: 4 * vw,
    color: colors.grayDark,
  },
  leaving: {
    ...sheet.textBold,
    fontSize: 4 * vw,
    color: colors.red,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 5 * vh,
  },
  logout: {
    color: colors.red,
    fontSize: 4.5 * vw,
    ...sheet.textBold,
  },
});
