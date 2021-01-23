import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  success: {
    fontSize: 35,
    color: colors.green,
    ...sheet.textSemiBold,
  },
  message: {
    fontSize: 14,
    color: colors.grayDark,
    ...sheet.textMedium,
    marginTop: 5,
    marginBottom: 150,
  },
});
