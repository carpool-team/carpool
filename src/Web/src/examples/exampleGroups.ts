import * as faker from "faker";
import { IGroup } from "../components/groups/interfaces/IGroup";

const exampleGroups: IGroup[] = [
  {
		id: faker.random.alphaNumeric(32),
		name: faker.random.word(),
    location: {
      longtitude: 52.40656926303501,
      latitude: 16.86633729745128,
      rideCount: faker.random.number({min: 0, max: 100}),
    },
  },
  {
		id: faker.random.alphaNumeric(32),
		name: faker.random.word(),
    location: {
      longtitude: 52.40656926303501,
      latitude: 16.86633729745128,
      rideCount: faker.random.number({min: 0, max: 100}),
    },
  },
  {
		id: faker.random.alphaNumeric(32),
		name: faker.random.word(),
    location: {
      longtitude: 52.40656926303501,
      latitude: 16.86633729745128,
      rideCount: faker.random.number({min: 0, max: 100}),
    },
  },
  {
		id: faker.random.alphaNumeric(32),
		name: faker.random.word(),
    location: {
      longtitude: 52.40656926303501,
      latitude: 16.86633729745128,
      rideCount: faker.random.number({min: 0, max: 100}),
    },
  },
];

export default exampleGroups;
