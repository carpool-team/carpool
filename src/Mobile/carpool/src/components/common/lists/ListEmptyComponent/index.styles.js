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
    color: colors.grayVeryDark,
    textTransform: 'uppercase',
    fontSize: 16,
    marginBottom: 75,
  },
});

export default styles;
