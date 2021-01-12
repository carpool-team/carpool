import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  footer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  nextStop: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    marginBottom: 8,
  },
  distance: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 16,
  },
  groupName: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 16,
    marginLeft: 8,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 16,
  },
  more: {
    ...sheet.textSemiBold,
    color: colors.orange,
    fontSize: 16,
    padding: 16,
    paddingBottom: 0,
  },
  passenger: {
    ...sheet.rowCenter,
    paddingTop: 12,
  },
  name: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 16,
    marginLeft: 8,
  },
});
