import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 54,
  },
  seats: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 24,
  },
  carWrapper: {
    width: '100%',
  },
  car: {
    flex: 2,
  },
  buttonsWrapper: {
    flex: 3,
  },
  numOfSeats: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 32,
  },
});
