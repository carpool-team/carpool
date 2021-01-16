import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  upview: {
    width: '100%',
    marginBottom: 30,
  },
  contentContainer: {
    padding: 16,
    justifyContent: 'space-between',
  },
  time: {
    ...sheet.textMedium,
    color: colors.grayDark,
    fontSize: 20,
  },
  date: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    fontSize: 14,
    marginTop: 4,
  },
  name: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 14,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  circleButton: {
    marginRight: 32,
  },
  moreButtonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  close: {
    ...sheet.textMedium,
    color: colors.orange,
    fontSize: 14,
    padding: 8,
  },
  percentage: {
    ...sheet.textSemiBold,
    fontSize: 16,
  },
  approx: {
    ...sheet.textMedium,
    fontSize: 14,
    color: colors.grayVeryDark,
  },
});
