import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  perfect: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 14,
  },
  great: {
    ...sheet.textSemiBold,
    color: '#00d2d3',
    fontSize: 14,
  },
  good: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 14,
  },
  mediocre: {
    ...sheet.textSemiBold,
    color: colors.orange,
    fontSize: 14,
  },
  bad: {
    ...sheet.textSemiBold,
    color: '#ff6b6b',
    fontSize: 14,
  },
  terrible: {
    ...sheet.textSemiBold,
    color: colors.red,
    fontSize: 14,
  },
});
