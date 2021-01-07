import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../../styles';

export const styles = StyleSheet.create({
  upview: {
    width: '100%',
    height: 150,
    marginTop: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  time: {
    ...sheet.textMedium,
    color: colors.orange,
    fontSize: 22,
  },
});
