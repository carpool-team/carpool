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
    paddingVertical: 16,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  userDataWrapper: {
    height: 60,
    flex: 1,
    paddingLeft: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 18,
    color: colors.blue,
    ...sheet.textSemiBold,
  },
  rating: {
    color: colors.grayDark,
    fontSize: 18,
    ...sheet.textSemiBold,
  },
  rideInfoContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  upcomingRide: {
    fontSize: 18,
    color: colors.blue,
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
