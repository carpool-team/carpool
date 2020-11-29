import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  marker: {
    marginRight: 12,
    marginBottom: 50,
  },
  container: {
    width: '100%',
    ...sheet.rowCenter,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 52,
  },
  from: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 16,
  },
  to: {
    ...sheet.textBold,
    color: colors.green,
    fontSize: 16,
  },
  placeName: {
    ...sheet.textSemiBold,
    fontSize: 16,
    color: colors.grayDark,
  },
});
