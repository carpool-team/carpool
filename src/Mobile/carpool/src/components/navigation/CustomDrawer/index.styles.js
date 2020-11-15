import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';

export const styles = StyleSheet.create({
  flexed: {
    flex: 1,
  },
  userInfoContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 27,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  userDataWrapper: {
    height: 72,
    flex: 1,
    paddingLeft: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 22,
    color: colors.blue,
    ...sheet.textSemiBold,
  },
  rating: {
    color: colors.grayDark,
    fontSize: 22,
    ...sheet.textSemiBold,
  },
  rideInfoContainer: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 36,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  upcomingRide: {
    fontSize: 18,
    color: colors.green,
    ...sheet.textMedium,
    marginBottom: 18,
  },
  rideCard: {
    width: '100%',
    height: 90,
  },
  rideCardContent: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  driversName: {
    ...sheet.textBold,
    fontSize: 16,
    color: colors.grayDark,
  },
  leaving: {
    ...sheet.textBold,
    fontSize: 16,
    color: colors.red,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 45,
  },
  logout: {
    color: colors.red,
    fontSize: 20,
    ...sheet.textBold,
  },
});
