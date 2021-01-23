import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../../styles';

export const styles = StyleSheet.create({
  upview: {
    width: '100%',
    height: 125,
    marginTop: 20,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  time: {
    ...sheet.textMedium,
    color: colors.orange,
    fontSize: 22,
  },
});
