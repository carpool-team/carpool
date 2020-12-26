import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    color: colors.orange,
    ...sheet.textSemiBold,
    marginBottom: 50,
  },
  info: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 20,
    marginBottom: 20,
  },
  upview: {
    height: 80,
    width: '46%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  direction: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 24,
  },
  name: {
    ...sheet.textMedium,
    color: colors.grayDark,
    fontSize: 32,
    marginTop: 20,
  },
  placeName: {
    ...sheet.textSemiBold,
    color: colors.grayVeryDark,
    fontSize: 16,
    marginTop: 8,
    marginLeft: 10,
  },
  center: {
    alignItems: 'center',
    width: '100%',
  },
});
