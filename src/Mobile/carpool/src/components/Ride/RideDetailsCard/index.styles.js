import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  upview: {
    height: 140,
    marginTop: 16,
  },
  contentContainer: {
    padding: 16,
    justifyContent: 'space-between',
  },
  time: {
    ...sheet.textMedium,
    color: colors.orange,
    fontSize: 20,
  },
  date: {
    ...sheet.textMedium,
    color: colors.grayDark,
    fontSize: 16,
  },
});
