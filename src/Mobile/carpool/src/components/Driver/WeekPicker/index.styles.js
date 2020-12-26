import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  icon: {
    paddingHorizontal: 15,
  },
  dateRange: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    fontSize: 18,
  },
  past: {
    ...sheet.textMedium,
    color: colors.blue,
    fontSize: 16,
    paddingHorizontal: 15,
  },
  flexLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  flexRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  pastRides: {
    ...sheet.textSemiBold,
    color: colors.orange,
    fontSize: 18,
  },
});
