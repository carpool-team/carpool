import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
  },
  weekdayWrapper: {
    width: '100%',
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.75,
  },
  weekday: {
    color: colors.grayVeryDark,
    textTransform: 'uppercase',
    ...sheet.textSemiBold,
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  today: {
    color: colors.blue,
    textTransform: 'uppercase',
    ...sheet.textSemiBold,
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
  ridesWrapper: {
    paddingHorizontal: 16,
  },
});
