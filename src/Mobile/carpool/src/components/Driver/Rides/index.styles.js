import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 8,
  },
  rideRequests: {
    padding: 8,
    ...sheet.textMedium,
    color: colors.green,
    fontSize: 16,
  },
});
