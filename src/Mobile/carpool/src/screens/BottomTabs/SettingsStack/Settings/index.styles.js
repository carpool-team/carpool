import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../styles';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: '25%',
  },
  flexCenter: {
    flex: 1,
    alignItems: 'center',
  },
  delete: {
    padding: 10,
    color: colors.red,
    ...sheet.textMedium,
    fontSize: 16,
  },
  edit: {
    padding: 10,
    color: colors.blue,
    ...sheet.textMedium,
    fontSize: 16,
  },
  circle: {
    height: 100,
    width: 100,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 30,
    marginTop: 30,
  },
  email: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 18,
    marginTop: 5,
  },
  version: {
    alignSelf: 'center',
    color: colors.grayDark,
    marginTop: 10,
  },
});
