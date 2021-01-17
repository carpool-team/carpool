import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 30,
  },
  title: {
    fontSize: 16,
    color: colors.grayVeryDark,
    ...sheet.textSemiBold,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  placeWrapper: {
    flex: 1,
  },
  placeNameWrapper: {
    ...sheet.rowCenter,
    paddingHorizontal: 16,
  },
  placeName: {
    ...sheet.textSemiBold,
    marginLeft: 12,
    color: colors.grayDark,
    fontSize: 16,
    flex: 1,
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
    fontSize: 16,
    color: colors.grayVeryDark,
  },
  listWrapper: {
    width: '100%',
  },
  buttonWrapper: {
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
  },
  buttonsWrapper: {
    ...sheet.rowCenterSplit,
    paddingHorizontal: 16,
  },
  mainWrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
});
