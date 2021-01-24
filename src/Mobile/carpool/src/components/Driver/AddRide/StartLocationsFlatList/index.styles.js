import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  flatList: {
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 12,
    paddingTop: 18,
  },
  marker: {
    marginRight: 12,
  },
  placeName: {
    ...sheet.textMedium,
    fontSize: 14,
    marginBottom: 5,
    color: colors.grayVeryDark,
    flexWrap: 'wrap',
    flex: 1,
  },
});
