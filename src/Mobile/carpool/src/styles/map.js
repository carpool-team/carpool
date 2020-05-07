import colors from './colors';
import {vw} from '../utils/constants';

export const activeRouteStyle = {
  lineColor: colors.blue,
  lineWidth: 1.5 * vw,
  lineCap: 'round',
};
export const inactiveRouteStyle = {
  lineColor: colors.gray,
  lineWidth: 1.5 * vw,
  lineCap: 'round',
};
