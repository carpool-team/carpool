import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';

export const styles = StyleSheet.create({
  title: {
    ...sheet.textSemiBold,
    fontSize: 32,
    color: colors.blue,
    alignSelf: 'center',
    marginVertical: 24,
  },
});
