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
});
