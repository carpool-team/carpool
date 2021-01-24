import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  select: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 16,
    padding: 16,
  },
});
