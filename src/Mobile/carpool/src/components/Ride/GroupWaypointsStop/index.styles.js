import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...sheet.rowCenter,
  },
  wrapper: {
    height: 100,
    flex: 1,
    ...sheet.rowCenter,
  },
  columnLeft: {
    flexDirection: 'column',
    height: 92,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 8,
  },
  columnRight: {
    flexDirection: 'column',
    height: 100,
    justifyContent: 'space-between',
  },
  placeName: {
    ...sheet.textSemiBold,
    fontSize: 16,
    color: colors.grayDark,
  },
  line: {
    flex: 1,
    backgroundColor: colors.grayVeryDark,
    width: 1,
    marginVertical: 1,
  },
});
