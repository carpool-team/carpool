import moment from 'moment';

export const byStatus = (a, b) => {
  if (a.isPending && !b.isPending) {
    return -1;
  }
  if (!a.isPending && b.isPending) {
    return 1;
  }
  return 0;
};

export const byDateOnCondition = (a, b) => {
  const isSame = a.isPending === b.isPending;
  if (isSame) {
    if (moment(a.ride.date).isBefore(moment(b.ride.date))) {
      return -1;
    }
    if (moment(b.ride.date).isBefore(moment(a.ride.date))) {
      return 1;
    }
    return 0;
  }
  return 0;
};
