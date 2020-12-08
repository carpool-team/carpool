import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../styles';

export const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 32,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
  },
  info: {
    fontSize: 12,
    color: colors.grayDark,
    ...sheet.textMedium,
    marginBottom: 20,
  },
  apiError: {
    textAlign: 'left',
    width: '100%',
    marginBottom: 20,
    fontSize: 16,
    ...sheet.textSemiBold,
    color: colors.red,
  },
});
