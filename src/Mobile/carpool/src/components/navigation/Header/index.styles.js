import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    width: '100%',
    height: 75,
    borderBottomColor: colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...sheet.rowCenterSplit,
    paddingHorizontal: 16,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    fontSize: 18,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
