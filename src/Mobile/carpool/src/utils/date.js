import moment from 'moment';

export const getWeek = offset => {
  const start = moment()
    .add(offset, 'weeks')
    .startOf('isoWeek');
  const end = moment()
    .add(offset, 'weeks')
    .endOf('isoWeek');
  const current = start.clone();
  const week = [];

  while (current.isBefore(end)) {
    week.push(current.format('YYYY-MM-DD'));
    current.add(1, 'day');
  }

  return week;
};

export const getDates = offset => {
  const week = getWeek(offset);
  const range = `${moment(week[0]).format('DD.MM')} - ${moment(week[6]).format(
    'DD.MM',
  )}`;

  const firstDay = moment(week[0]).format();
  const lastDay = moment(week[6]).format();

  return {
    firstDay,
    lastDay,
    range,
    week,
  };
};
