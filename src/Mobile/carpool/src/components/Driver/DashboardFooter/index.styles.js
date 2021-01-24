import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  footer: {
    width: '100%',
    padding: 16,
  },
  nextStop: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    marginBottom: 8,
    fontSize: 16,
  },
  distance: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 22,
  },
  placeName: {
    flex: 1,
    paddingRight: 10,
    ...sheet.textMedium,
    fontSize: 14,
    color: colors.grayVeryDark,
  },
});
