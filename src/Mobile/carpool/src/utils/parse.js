export const parseDistance = dist => {
  let dst = Math.round(dist);
  if (dst < 1000) {
    return `${dst} m`;
  } else {
    return `${(dst / 1000).toFixed(1)} km`;
  }
};
