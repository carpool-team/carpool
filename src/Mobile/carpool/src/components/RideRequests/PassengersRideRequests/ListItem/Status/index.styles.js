import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../../styles';

export const styles = StyleSheet.create({
  pending: {
    ...sheet.textMedium,
    color: colors.orange,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  accepted: {
    ...sheet.textMedium,
    color: colors.green,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  rejected: {
    ...sheet.textMedium,
    color: colors.red,
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
