import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    paddingVertical: 9,
  },
  address: {
    ...sheet.textMedium,
    fontSize: 14,
    marginBottom: 5,
    color: colors.grayVeryDark,
    flexWrap: 'wrap',
    flex: 1,
  },
  marker: {
    marginRight: 12,
  },
});
