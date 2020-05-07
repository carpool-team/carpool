import {multiPoint} from '@turf/helpers';
import bbox from '@turf/bbox';

export const getBoundsForRoutes = routesArray => {
  const allCoords = routesArray.map(rt => rt.geometry.coordinates).flat(1);
  const allPoints = multiPoint(allCoords);
  const boundingBox = bbox(allPoints);
  const [ne1, ne2, sw1, sw2] = boundingBox;

  return {
    ne: [ne1, ne2],
    sw: [sw1, sw2],
  };
};
