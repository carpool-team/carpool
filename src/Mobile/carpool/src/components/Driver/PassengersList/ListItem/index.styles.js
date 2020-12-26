import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  upview: {
    width: '100%',
    height: 100,
    marginTop: 16,
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  name: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 18,
    marginLeft: 8,
  },
  placeName: {
    fontSize: 14,
    color: colors.grayDark,
    ...sheet.textSemiBold,
  },
});
