import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  goBack: {
    ...sheet.textSemiBold,
    color: colors.orange,
    fontSize: 16,
    marginLeft: 10,
  },
  fetching: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 16,
    marginLeft: 10,
  },
  step: {
    ...sheet.textMedium,
    fontSize: 14,
    marginHorizontal: 8,
    color: colors.grayVeryDark,
    flex: 1,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stepDistance: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 16,
  },
  success: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 18,
    textAlign: 'center',
  },
  content: {
    ...sheet.rowCenterSplit,
    paddingHorizontal: 8,
    width: '100%',
  },
  row: {
    ...sheet.rowCenter,
    flex: 1,
  },
});
