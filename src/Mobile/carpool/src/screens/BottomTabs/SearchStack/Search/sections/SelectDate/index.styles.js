import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../../../styles';

export const styles = StyleSheet.create({
  singularContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 54,
  },
  button: {
    marginTop: 50,
  },
  timeSlotWrapper: {
    ...sheet.rowCenter,
    width: '100%',
  },
  timeSlot: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 14,
  },
  underSlider: {
    ...sheet.rowCenterSplit,
    width: '100%',
    paddingHorizontal: 12,
  },
  value: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 16,
  },
  slider: {
    width: '100%',
    marginTop: 12,
  },
});
