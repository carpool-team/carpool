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
    width: 45,
    height: 45,
  },
  indicator: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 28,
  },
  disabledIndicator: {
    ...sheet.textSemiBold,
    color: colors.gray,
    fontSize: 28,
  },
  count: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    fontSize: 22,
  },
});
