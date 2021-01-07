import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  title: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 18,
    paddingVertical: 8,
  },
  seeAll: {
    ...sheet.textMedium,
    color: colors.blue,
    fontSize: 14,
  },
  loadingWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexed: {
    width: '100%',
    flex: 1,
  },
  topButton: {
    ...sheet.rowCenterSplit,
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  count: {
    ...sheet.textSemiBold,
    fontSize: 14,
    color: colors.blue,
  },
});
