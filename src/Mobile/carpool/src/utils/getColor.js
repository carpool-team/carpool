import {colors} from '../styles';

export const getColor = date => {
  const dt = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = dt - now;
  const minutes = parseInt(diff / (1000 * 60));

  if (minutes < 20) {
    return colors.red;
  } else {
    if (minutes < 45) {
      return colors.orange;
    } else {
      if (minutes < 90) {
        return colors.yellow;
      } else {
        return colors.green;
      }
    }
  }
};
