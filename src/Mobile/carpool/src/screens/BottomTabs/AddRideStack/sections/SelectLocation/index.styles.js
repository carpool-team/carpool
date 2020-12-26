import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 30,
    color: colors.orange,
    ...sheet.textSemiBold,
  },
  placeWrapper: {
    flex: 1,
    paddingTop: 30,
  },
  placeName: {
    ...sheet.textSemiBold,
    marginLeft: 12,
    color: colors.grayDark,
    fontSize: 18,
  },
  mapWrapper: {
    width: '100%',
    flex: 1,
    marginTop: 16,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: colors.grayDark,
    paddingVertical: 8,
    ...sheet.textMedium,
    fontSize: 18,
    color: colors.grayVeryDark,
  },
  listWrapper: {
    // flex: 1,
    width: '100%',
  },
  buttonWrapper: {
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
  },
});
