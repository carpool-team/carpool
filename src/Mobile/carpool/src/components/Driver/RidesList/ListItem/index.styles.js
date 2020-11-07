import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  upview: {
    width: '100%',
    height: 200,
    marginBottom: 36,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topRow: {
    width: '100%',
    ...sheet.rowCenter,
  },
  circleButton: {
    marginRight: 12,
  },
  column: {
    flexDirection: 'column',
    height: 56,
    justifyContent: 'space-between',
  },
  singleRide: {
    ...sheet.textBold,
    fontSize: 16,
    color: colors.grayDark,
  },
  leavingIn: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 16,
  },
});
