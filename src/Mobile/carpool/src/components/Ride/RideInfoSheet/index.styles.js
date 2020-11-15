import {colors, sheet} from '../../../styles';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 36,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  upperContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 18,
    ...sheet.rowCenter,
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 64,
    paddingVertical: 5,
  },
  username: {
    ...sheet.textBold,
    fontSize: 16,
    color: colors.grayDark,
    flex: 1,
    marginRight: 4,
  },
  distance: {
    ...sheet.textBold,
    fontSize: 16,
    color: colors.blue,
  },
  leavingIn: {
    ...sheet.textBold,
    fontSize: 16,
  },
  button: {
    width: '65%',
    height: 54,
    marginTop: 27,
  },
  buttonText: {
    ...sheet.textBold,
    color: colors.green,
    fontSize: 16,
  },
  detailsRow: {
    ...sheet.rowCenterSplit,
    marginTop: 27,
    marginBottom: 27,
  },
  leftCard: {
    paddingVertical: 27,
    paddingHorizontal: 16,
    width: 128,
    ...sheet.rowCenter,
    justifyContent: 'center',
  },
  rating: {
    ...sheet.textBold,
    fontSize: 24,
    color: colors.grayDark,
  },
  rightCard: {
    paddingVertical: 27,
    paddingHorizontal: 16,
    width: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    ...sheet.textBold,
    fontSize: 24,
    color: colors.green,
  },
  free: {
    ...sheet.textBold,
    fontSize: 24,
    color: colors.blue,
  },
  carWrapper: {
    ...sheet.rowCenter,
    marginBottom: 27,
  },
  car: {
    ...sheet.textBold,
    fontSize: 28,
    color: colors.grayDark,
  },
  success: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 36,
  },
});
