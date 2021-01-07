import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 140,
    marginBottom: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    ...sheet.textSemiBold,
    fontSize: 20,
    color: colors.grayVeryDark,
  },
  since: {
    ...sheet.textRegular,
    fontSize: 14,
    color: colors.grayDark,
    marginTop: 4,
  },
  members: {
    ...sheet.textSemiBold,
    fontSize: 18,
    marginLeft: 8,
    color: colors.blue,
  },
  rides: {
    ...sheet.textSemiBold,
    fontSize: 18,
    marginLeft: 8,
    color: colors.green,
  },
  distance: {
    ...sheet.textSemiBold,
    fontSize: 18,
    marginLeft: 8,
    color: colors.orange,
  },
  topWrapper: {
    width: '100%',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
});
