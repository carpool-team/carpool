import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  circleButton: {
    marginRight: 12,
  },
  upperContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 18,
    ...sheet.rowCenter,
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 64,
    paddingVertical: 5,
  },
  regularRide: {
    ...sheet.textBold,
    fontSize: 16,
    color: colors.blue,
    flex: 1,
    marginRight: 4,
  },
  distance: {
    ...sheet.textBold,
    fontSize: 16,
    color: colors.blue,
  },
  leavingIn: {
    ...sheet.textSemiBold,
    fontSize: 16,
  },
});
