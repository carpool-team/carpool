import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  success: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 40,
  },
  info: {
    ...sheet.textMedium,
    color: colors.red,
    fontSize: 16,
  },
});