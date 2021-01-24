import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  perfect: {
    ...sheet.textSemiBold,
    fontSize: 14,
  },
  great: {
    ...sheet.textSemiBold,
    fontSize: 14,
  },
  good: {
    ...sheet.textSemiBold,
    fontSize: 14,
  },
  mediocre: {
    ...sheet.textSemiBold,
    fontSize: 14,
  },
  bad: {
    ...sheet.textSemiBold,
    fontSize: 14,
  },
  terrible: {
    ...sheet.textSemiBold,
    fontSize: 14,
  },
  text: {
    ...sheet.textSemiBold,
    fontSize: 14,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 4,
  },
  bar: {
    height: 4,
    borderRadius: 4,
  },
});
