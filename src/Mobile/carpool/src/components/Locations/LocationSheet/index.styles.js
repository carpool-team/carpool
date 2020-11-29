import {colors, sheet} from '../../../styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    backgroundColor: colors.background,
    height: '100%',
    paddingTop: 9,
    paddingBottom: 54,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
  },
  placeName: {
    ...sheet.textMedium,
    flex: 1,
    flexWrap: 'wrap',
    fontSize: 14,
    color: colors.grayVeryDark,
  },
  buttonsContainer: {
    ...sheet.rowCenter,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    height: 54,
  },
  goBack: {
    color: colors.red,
    fontSize: 20,
    ...sheet.textBold,
  },
  select: {
    color: colors.green,
    fontSize: 20,
    ...sheet.textBold,
  },
  header: {
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    height: 22,
  },
  marker: {
    marginRight: 12,
  },
});
