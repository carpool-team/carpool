import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';

export const styles = StyleSheet.create({
  title: {
    ...sheet.textSemiBold,
    fontSize: 36,
    color: colors.blue,
    alignSelf: 'center',
    marginVertical: 24,
  },
});
