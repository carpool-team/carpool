import {StyleSheet} from 'react-native';
import {sheet} from '../../../../styles';

export const styles = StyleSheet.create({
  container: {
    ...sheet.rowCenterSplit,
    width: '100%',
  },
  circle: {
    width: 40,
    height: 40,
  },
  circleLabel: {
    ...sheet.textMedium,
    fontSize: 12,
  },
});
