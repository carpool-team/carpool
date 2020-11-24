import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  upview: {
    width: '100%',
    height: 150,
    marginBottom: 36,
  },
  container: {
    flex: 1,
    padding: 20,
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
  date: {
    ...sheet.textMedium,
    color: colors.grayDark,
    fontSize: 16,
  },
  time: {
    ...sheet.textMedium,
    color: colors.orange,
    fontSize: 25,
  },
});
