import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  select: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 18,
    marginLeft: 16,
  },
});
