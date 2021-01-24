import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';

export const styles = StyleSheet.create({
  flatlist: {
    width: '100%',
  },
  contentContainer: {
    paddingTop: 18,
    paddingHorizontal: 16,
    paddingBottom: 72,
  },
  listHeader: {
    paddingBottom: 24,
  },
  listHeaderText: {
    ...sheet.textMedium,
    color: colors.grayDark,
    fontSize: 14,
  },
});
