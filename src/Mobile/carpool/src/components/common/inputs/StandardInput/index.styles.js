import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  placeholder: {
    ...sheet.textMedium,
    fontSize: 16,
    color: colors.grayDark,
  },
  input: {
    width: '100%',
    flex: 1,
    borderBottomWidth: 2,
    borderColor: colors.grayDark,
    paddingVertical: 8,
    ...sheet.textMedium,
    fontSize: 18,
    color: colors.grayVeryDark,
  },
  error: {
    fontSize: 16,
    ...sheet.textRegular,
    color: colors.red,
    marginTop: 8,
  },
});
