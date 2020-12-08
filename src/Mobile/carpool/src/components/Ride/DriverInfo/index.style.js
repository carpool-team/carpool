import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  upview: {
    width: '100%',
    height: 80,
  },
  contentContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  username: {
    ...sheet.textSemiBold,
    fontSize: 16,
    color: colors.grayVeryDark,
    flex: 1,
    marginRight: 4,
  },
  distance: {
    ...sheet.textBold,
    fontSize: 16,
    color: colors.blue,
  },
  leavingIn: {
    ...sheet.textSemiBold,
    fontSize: 16,
  },
});
