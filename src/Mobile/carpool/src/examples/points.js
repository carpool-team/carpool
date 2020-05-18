export const examplePassengerPoints = [
  {
    id: Math.random().toString(),
    coordinates: [16.87619606957975, 52.44776959009451],
    timeLeft: 35,
    ride: {
      id: Math.random().toString(),
      timeLeft: 35,
      user: {
        id: Math.random().toString(),
        firstName: 'John',
        lastName: 'Doe',
        rating: 4.8,
        car: 'Opel Astra',
      },
      group: {
        id: Math.random().toString(),
        name: 'Corporation inc',
        coordinates: [16.717880781607562, 52.449441753937776],
      },
      price: null,
    },
    signedUp: false,
  },
  {
    id: Math.random().toString(),
    coordinates: [16.872724766534958, 52.44373969820646],
    timeLeft: 50,
    ride: {
      id: Math.random().toString(),
      timeLeft: 50,
      user: {
        id: Math.random().toString(),
        firstName: 'Brandon',
        lastName: 'Ingram',
        rating: 4.5,
        car: 'Renault Clio',
      },
      group: {
        id: Math.random().toString(),
        name: 'Gym fitness',
        coordinates: [16.873619568494547, 52.47400508902609],
      },
      price: 4,
    },
    signedUp: false,
  },
  {
    id: Math.random().toString(),
    coordinates: [16.88208390230244, 52.437882807097054],
    timeLeft: 19,
    ride: {
      id: Math.random().toString(),
      timeLeft: 19,
      user: {
        id: Math.random().toString(),
        firstName: 'Stephen',
        lastName: 'Curry',
        rating: 5.0,
        car: 'Fiat Panda',
      },
      group: {
        id: Math.random().toString(),
        name: 'Gym fitness',
        coordinates: [16.873619568494547, 52.47400508902609],
      },
      price: 3,
    },
    signedUp: true,
  },
  {
    id: Math.random().toString(),
    coordinates: [16.86535340163644, 52.45314149371475],
    timeLeft: 42,
    ride: {
      id: Math.random().toString(),
      timeLeft: 42,
      user: {
        id: Math.random().toString(),
        firstName: 'Steve',
        lastName: 'Jobs',
        rating: 4.6,
        car: 'Nissan Almera',
      },
      group: {
        id: Math.random().toString(),
        name: 'Corporation inc',
        coordinates: [16.717880781607562, 52.449441753937776],
      },
      price: 4,
    },
    signedUp: false,
  },
  {
    id: Math.random().toString(),
    coordinates: [16.867204187861404, 52.44168865407403],
    timeLeft: 90,
    ride: {
      id: Math.random().toString(),
      timeLeft: 90,
      user: {
        id: Math.random().toString(),
        firstName: 'Gordon',
        lastName: 'Ramsay',
        rating: 5.0,
        car: 'BMW 3',
      },
      group: {
        id: Math.random().toString(),
        name: 'Grocery store',
        coordinates: [16.8969900272229, 52.447001762887766],
      },
      price: null,
    },
    signedUp: false,
  },
  {
    id: Math.random().toString(),
    coordinates: [16.890569263723165, 52.44689814009672],
    timeLeft: 120,
    ride: {
      id: Math.random().toString(),
      timeLeft: 120,
      user: {
        id: Math.random().toString(),
        firstName: 'Marco',
        lastName: 'White',
        rating: 4.4,
        car: 'Volkswagen Passat',
      },
      group: {
        id: Math.random().toString(),
        name: 'Grocery store',
        coordinates: [16.8969900272229, 52.447001762887766],
      },
      price: null,
    },
    signedUp: false,
  },
  {
    id: Math.random().toString(),
    coordinates: [16.87987166828279, 52.45931604833598],
    timeLeft: 7,
    ride: {
      id: Math.random().toString(),
      timeLeft: 7,
      user: {
        id: Math.random().toString(),
        firstName: 'Bill',
        lastName: 'Gates',
        rating: 5.0,
        car: 'Land Rover Discovery',
      },
      group: {
        id: Math.random().toString(),
        name: 'Corporation inc',
        coordinates: [16.717880781607562, 52.449441753937776],
      },
      price: 2,
    },
    signedUp: false,
  },
  {
    id: Math.random().toString(),
    coordinates: [16.854908387924553, 52.45528603351477],
    timeLeft: 180,
    ride: {
      id: Math.random().toString(),
      timeLeft: 180,
      user: {
        id: Math.random().toString(),
        firstName: 'Bradley',
        lastName: 'Beal',
        rating: 4.8,
        car: 'Skoda Fabia',
      },
      group: {
        id: Math.random().toString(),
        name: 'Gym fitness',
        coordinates: [16.873619568494547, 52.47400508902609],
      },
      price: 6,
    },
    signedUp: false,
  },
  {
    id: Math.random().toString(),
    coordinates: [16.85920654976428, 52.455748696955624],
    timeLeft: 10,
    ride: {
      id: Math.random().toString(),
      timeLeft: 10,
      user: {
        id: Math.random().toString(),
        firstName: 'Michael',
        lastName: 'Roar',
        rating: 4.2,
        car: 'Nissan Almera',
      },
      group: {
        id: Math.random().toString(),
        name: 'Pub',
        coordinates: [16.85920654976428, 52.455748696955624],
      },
      price: 6,
    },
    signedUp: true,
  },
];

export const examplePoints = [
  {
    id: Math.random().toString(),
    date: new Date(),
    destination: {
      coordinates: {
        longitude: 52.449441753937776,
        latitude: 16.717880781607562,
      },
      locationName: null,
      id: Math.random().toString(),
    },
    owner: {
      firstName: 'John',
      lastName: 'Doe',
      userId: Math.random().toString(),
    },
    participants: [],
    startingLocation: {
      coordinates: {
        longitude: 52.44776959009451,
        latitude: 16.87619606957975,
      },
      locationName: null,
      id: Math.random().toString(),
    },
    stops: [],
  },
];
