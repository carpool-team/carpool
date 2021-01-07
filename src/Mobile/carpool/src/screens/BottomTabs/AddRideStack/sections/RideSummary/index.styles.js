import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  mapWrapper: {
    width: '100%',
    flex: 1,
  },
  waypoints: {
    width: '100%',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  bottomWrapper: {
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  detailsWrapper: {
    ...sheet.rowCenterSplit,
    marginTop: 16,
  },
  time: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 20,
  },
  date: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 14,
    marginTop: 5,
  },
  seats: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 20,
    marginLeft: 12,
  },
  buttonsWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '10%',
    paddingHorizontal: 16,
    paddingTop: 25,
  },
  buttonsContainer: {
    ...sheet.rowCenterSplit,
    width: '100%',
  },
  loadingWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  until: {
    ...sheet.textMedium,
    color: colors.grayDark,
    fontSize: 14,
  },
});
