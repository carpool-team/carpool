import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  upview: {
    width: '100%',
    height: 150,
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
  resign: {
    ...sheet.textSemiBold,
    color: colors.red,
    fontSize: 14,
    paddingVertical: 8,
    paddingLeft: 8,
  },
});
