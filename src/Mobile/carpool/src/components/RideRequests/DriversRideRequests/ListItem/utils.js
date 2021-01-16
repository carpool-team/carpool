import {colors} from '../../../../styles';

export const getColor = extension => {
  if (extension < 15) {
    return colors.green;
  }
  if (extension < 40) {
    return '#00d2d3';
  }
  if (extension < 65) {
    return colors.blue;
  }
  if (extension < 100) {
    return colors.orange;
  }
  if (extension < 150) {
    return '#ff6b6b';
  }
  return colors.red;
};
