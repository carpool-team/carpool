import {StyleSheet} from 'react-native';
import {sheet} from '../../../../styles';

export const styles = StyleSheet.create({
  container: {
    ...sheet.rowCenterSplit,
    flexWrap: 'wrap',
    width: '100%',
  },
  circle: {
    width: 38,
    height: 38,
    margin: 5,
  },
  circleLabel: {
    ...sheet.textMedium,
    fontSize: 12,
  },
});
