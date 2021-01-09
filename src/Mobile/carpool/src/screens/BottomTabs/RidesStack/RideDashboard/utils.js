// Values in meters
export const GO_BACK_THERESHOLD = 50;
export const NEW_ROUTE_THERESHOLD = 100;
export const NEXT_STEP_THERESHOLD = 10;
export const NEXT_STOP_THERESHOLD = 100;

export const icons = {
  ['uturn']: 'md-arrow-down-outline',
  ['sharp right']: 'md-return-up-forward-sharp',
  ['right']: 'md-return-up-forward',
  ['slight right']: 'md-return-up-forward',
  ['straight']: 'arrow-up',
  ['slight left']: 'md-return-up-back',
  ['left']: 'md-return-up-back',
  ['sharp left']: 'md-return-up-back-sharp',
  ['default']: 'ios-car',
};

export const parseDistance = distance => {
  if (distance > 1000) {
    return `${(distance / 1000).toFixed(1)} km`;
  } else {
    return `${distance.toFixed(0)} m`;
  }
};

export const dirConfig = {
  profile: 'driving',
  overview: 'full',
  geometries: 'geojson',
  steps: true,
};
