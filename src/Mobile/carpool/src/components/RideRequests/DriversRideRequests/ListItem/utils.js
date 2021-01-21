import {colors} from '../../../../styles';

export const getColor = extension => {
  if (extension < 15) {
    return colors.green;
  }
  if (extension < 30) {
    return '#00d2d3';
  }
  if (extension < 50) {
    return colors.blue;
  }
  if (extension < 75) {
    return colors.orange;
  }
  if (extension < 100) {
    return '#ff6b6b';
  }
  return colors.red;
};
