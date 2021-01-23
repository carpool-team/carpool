import moment from 'moment';

export const matchRides = (rides, day) => {
  const current = moment(day);

  const filtered = rides.filter(ride => {
    const date = moment(ride.rideDate);

    if (date.isSame(current, 'day')) {
      return ride;
    }
  });

  if (filtered.length) {
    return [...filtered];
  }

  return null;
};

export const getWeekday = date => {
  return moment(date)
    .format('ddd D')
    .toLocaleUpperCase();
};

export const isToday = day => {
  return moment().isSame(moment(day), 'day');
};
