import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  upview: {
    width: '100%',
    height: 230,
    marginBottom: 30,
  },
  contentContainer: {
    padding: 16,
    justifyContent: 'space-between',
  },
  time: {
    ...sheet.textMedium,
    color: colors.grayDark,
    fontSize: 22,
  },
  date: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    fontSize: 14,
    marginTop: 4,
  },
  name: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  circleButton: {
    marginRight: 32,
  },
});
