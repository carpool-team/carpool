import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  button: {
    ...sheet.rowCenter,
    paddingVertical: 12,
  },
  name: {
    ...sheet.textSemiBold,
    marginLeft: 8,
    color: colors.grayDark,
    fontSize: 16,
  },
  flexed: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
