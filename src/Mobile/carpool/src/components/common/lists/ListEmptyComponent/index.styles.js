import {StyleSheet} from 'react-native';
import {sheet, colors} from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...sheet.textMedium,
    color: colors.grayDark,
    textTransform: 'uppercase',
    fontSize: 14,
    marginBottom: 75,
    lineHeight: 25,
  },
});

export default styles;
