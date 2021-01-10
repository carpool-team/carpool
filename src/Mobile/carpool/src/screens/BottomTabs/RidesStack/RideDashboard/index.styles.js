import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  goBack: {
    ...sheet.textSemiBold,
    color: colors.orange,
    fontSize: 16,
    marginLeft: 10,
  },
  fetching: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 16,
    marginLeft: 10,
  },
  step: {
    ...sheet.textMedium,
    fontSize: 14,
    marginHorizontal: 8,
    color: colors.grayVeryDark,
    flex: 1,
  },
  groupName: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 16,
    marginLeft: 8,
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  mapWrapper: {
    flex: 1,
    width: '100%',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  nextStop: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    marginBottom: 8,
  },
  refresh: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 16,
    zIndex: 10,
  },
  moveTo: {
    position: 'absolute',
    bottom: 15,
    right: 0,
    padding: 16,
    zIndex: 10,
  },
  distance: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 16,
  },
  stepDistance: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 16,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 16,
  },
  success: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 18,
    textAlign: 'center',
  },
});
