import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  count: {
    ...sheet.textSemiBold,
    fontSize: 14,
    color: colors.blue,
  },
  invitations: {
    ...sheet.rowCenterSplit,
    width: '100%',
    marginBottom: 16,
  },
});
