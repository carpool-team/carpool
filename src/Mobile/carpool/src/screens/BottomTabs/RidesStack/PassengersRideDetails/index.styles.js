import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../styles';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  container: {
    paddingBottom: 30,
  },
  topRow: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    ...sheet.rowCenterSplit,
  },
  time: {
    ...sheet.textMedium,
    fontSize: 20,
    color: colors.blue,
  },
  date: {
    ...sheet.textMedium,
    fontSize: 16,
    color: colors.grayDark,
    marginTop: 5,
  },
  mapWrapper: {
    height: 300,
  },
  waypoints: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  driverWrapper: {
    ...sheet.rowCenter,
    padding: 16,
  },
  driver: {
    ...sheet.textMedium,
    color: colors.grayVeryDark.slic,
    fontSize: 18,
    marginLeft: 16,
  },
});
