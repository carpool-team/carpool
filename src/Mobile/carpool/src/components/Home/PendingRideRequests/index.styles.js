import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  topButton: {
    ...sheet.rowCenterSplit,
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  count: {
    ...sheet.textSemiBold,
    fontSize: 14,
    color: colors.blue,
  },
});
