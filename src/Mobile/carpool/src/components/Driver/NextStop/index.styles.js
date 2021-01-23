import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';

export const styles = StyleSheet.create({
  placeName: {
    fontSize: 14,
    color: colors.grayDark,
    ...sheet.textSemiBold,
  },
});
