import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  circle: {
    width: 50,
    height: 50,
  },
  indicator: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 32,
  },
  count: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    fontSize: 24,
  },
});
