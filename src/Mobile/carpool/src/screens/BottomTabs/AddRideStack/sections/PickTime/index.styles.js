import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../../styles';

export const styles = StyleSheet.create({
  singularContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  regularContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 54,
  },
  switchRow: {
    ...sheet.rowCenterSplit,
    width: '100%',
  },
  regularRide: {
    ...sheet.textSemiBold,
    fontSize: 18,
    color: colors.grayVeryDark,
  },
  picker: {
    marginTop: 40,
  },
});
