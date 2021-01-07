import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 160,
    marginBottom: 36,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    ...sheet.textSemiBold,
    fontSize: 18,
    color: colors.grayVeryDark,
  },
  author: {
    ...sheet.textRegular,
    fontSize: 14,
    color: colors.grayDark,
  },
  members: {
    ...sheet.textSemiBold,
    fontSize: 18,
    marginLeft: 8,
    color: colors.blue,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  header: {
    width: '100%',
  },
  content: {
    ...sheet.rowCenter,
  },
  circleButton: {
    marginRight: 16,
  },
});
