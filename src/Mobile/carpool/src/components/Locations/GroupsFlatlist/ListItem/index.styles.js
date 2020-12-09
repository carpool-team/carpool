import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  container: {
    ...sheet.rowCenter,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: colors.grayDark,
    marginLeft: 12,
    paddingVertical: 10,
    ...sheet.textMedium,
  },
});
