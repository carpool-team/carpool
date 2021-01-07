import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 30,
  },
  weekdayWrapper: {
    width: '100%',
    borderTopColor: colors.gray,
    borderBottomColor: colors.gray,
    borderTopWidth: 0.75,
    borderBottomWidth: 0.75,
  },
  weekday: {
    color: colors.grayVeryDark,
    textTransform: 'uppercase',
    ...sheet.textSemiBold,
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  today: {
    color: colors.blue,
    textTransform: 'uppercase',
    ...sheet.textSemiBold,
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  ridesWrapper: {
    paddingHorizontal: 16,
  },
});
