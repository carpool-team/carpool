import {lineString} from '@turf/helpers';
import length from '@turf/length';
import {parseCoords} from './coords';
import {sortStops} from './sortStops';
import moment from 'moment';

/**
 *
 * @param {Ride} ride - ride object
 * @param {Location} location - selected location
 */
export const getExtension = (ride, location) => {
  try {
    // Sort stops for original ride
    const {sortedStops} = sortStops(
      ride.location,
      ride.group.location,
      ride.stops,
    );
    // Line between stops
    const line = lineString(sortedStops.map(item => parseCoords(item)));
    // Length of that line
    const lineLength = length(line, {units: 'meters'});

    // Stops + selected location
    const stopsWith = [...ride.stops, {location: location.coordinates}];
    // Sort stops including selected location
    const {sortedStops: sortedWith} = sortStops(
      ride.location,
      ride.group.location,
      stopsWith,
    );
    // Line between extended stops
    const lineWith = lineString(sortedWith.map(item => parseCoords(item)));
    // Length of that line
    const lineWithLength = length(lineWith, {units: 'meters'});

    // Difference between original routes length and extended routes length
    // Percentage
    const extension = Math.trunc(
      ((lineWithLength - lineLength) / lineLength) * 100,
    );

    return extension;
  } catch (err) {
    return undefined;
  }
};

/**
 *
 * @param {Ride[]} data - list of rides
 * @param {Location} location - selected lcoation
 * @param {function} compareFunction - compare function, i.e. byExtension
 */
export const sortRides = (data, location, compareFunction) => {
  try {
    let extended = [];
    // Get extension for every ride from the list
    data.forEach(item => {
      const extension = getExtension(item, location);

      extended = [
        ...extended,
        {
          ...item,
          extension,
        },
      ];
    });

    // Sort rides using provided compare function
    const sorted = [...extended].sort(compareFunction);

    return sorted;
  } catch (err) {
    return [...data];
  }
};

export const byDateAndExtension = (a, b) => {
  const isSame = moment(a.rideDate).isSame(b.rideDate, 'day');
  if (isSame) {
    if (a.extension < b.extension) {
      return -1;
    }
    if (a.extension > b.extension) {
      return 1;
    }
    return 0;
  }
  return 0;
};

export const byExtension = (a, b) => {
  if (a.extension < b.extension) {
    return -1;
  }
  if (a.extension > b.extension) {
    return 1;
  }
  return 0;
};
