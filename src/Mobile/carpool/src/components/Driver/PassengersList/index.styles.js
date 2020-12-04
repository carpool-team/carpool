import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
  },
  title: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    fontSize: 18,
  },
});
