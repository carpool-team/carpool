import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  title: {
    ...sheet.textSemiBold,
    fontSize: 45,
    color: colors.blue,
    alignSelf: 'center',
    marginVertical: 25,
  },
  container: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 32,
    flex: 1,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  message: {
    ...sheet.textRegular,
    width: '100%',
    marginBottom: 20,
    color: colors.grayDark,
    fontSize: 14,
  },
  button: {
    marginTop: 20,
  },
});
