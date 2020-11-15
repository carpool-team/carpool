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
    fontSize: 54,
    color: colors.blue,
    alignSelf: 'center',
    marginVertical: 40,
  },
  scrollView: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 32,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 40,
  },
  passwordInputWrapper: {
    width: '100%',
    marginBottom: 10,
  },
  forgotWrapper: {
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
  dontHave: {
    ...sheet.textRegular,
    fontSize: 16,
    color: colors.grayDark,
    marginTop: 24,
  },
  signUp: {
    ...sheet.textSemiBold,
    fontSize: 16,
    color: colors.blue,
    padding: 8,
  },
});
