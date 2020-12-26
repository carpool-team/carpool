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
  routeDetailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
  },
  time: {
    ...sheet.textSemiBold,
    fontSize: 32,
    color: colors.green,
  },
  timeUnit: {
    ...sheet.textSemiBold,
    fontSize: 32,
    color: colors.green,
  },
  distance: {
    ...sheet.textSemiBold,
    fontSize: 32,
    color: colors.orange,
  },
  distanceUnit: {
    ...sheet.textSemiBold,
    fontSize: 32,
    color: colors.orange,
  },
  marker: {
    marginBottom: 32,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
