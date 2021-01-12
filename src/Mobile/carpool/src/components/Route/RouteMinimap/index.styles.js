import {StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  activityIndicator: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 90,
  },
  marker: {
    marginBottom: 32,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  distance: {
    ...sheet.textSemiBold,
    color: colors.blue,
    fontSize: 14,
  },
  time: {
    ...sheet.textSemiBold,
    color: colors.green,
    fontSize: 14,
  },
});
