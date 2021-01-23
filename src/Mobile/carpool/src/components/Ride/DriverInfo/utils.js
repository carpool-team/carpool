import moment from 'moment';

export const getLeavingIn = date => {
  const minutes = moment(date).diff(moment(), 'minutes');
  const hours = moment(date).diff(moment(), 'hours');

  if (minutes < 60) {
    return `${minutes} minutes`;
  } else {
    if (hours < 12) {
      return `${hours} hours`;
    } else {
      return `${moment(date).format('HH:mm DD.MM.YYYY')}`;
    }
  }
};
