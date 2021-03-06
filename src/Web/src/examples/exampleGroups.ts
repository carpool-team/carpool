import * as faker from "faker";
import { fake } from "faker";
import { IGroup } from "../components/groups/interfaces/IGroup";

const exampleGroups: IGroup[] = [
	{
		groupId: faker.random.number(32).toString(),
		name: faker.random.word(),
		// code: faker.random.alphaNumeric(3),
		userCount: faker.random.number({ min: 0, max: 20 }),
		// owner: faker.random.alphaNumeric(32),
		location: {
			longitude: faker.random.number({ min: 51, max: 53, precision: 0.000001 }),
			latitude: faker.random.number({ min: 15, max: 17, precision: 0.0000001 }),
		},
		code: faker.random.word(),
		owner: {
			appUserId: faker.random.number(32).toString(),
			firstName: faker.random.word(),
			lastName: faker.random.word(),
			vehicle: faker.random.word(),
		},
		users: [],
		rideCount: faker.random.number({ min: 0, max: 100 }),
	},
	{
		groupId: faker.random.number(32).toString(),
		name: faker.random.word(),
		// code: faker.random.alphaNumeric(3),
		userCount: faker.random.number({ min: 0, max: 20 }),
		// owner: faker.random.alphaNumeric(32),
		location: {
			longitude: faker.random.number({ min: 51, max: 53, precision: 0.000001 }),
			latitude: faker.random.number({ min: 15, max: 17, precision: 0.0000001 }),
		},
		code: faker.random.word(),
		owner: {
			appUserId: faker.random.number(32).toString(),
			firstName: faker.random.word(),
			lastName: faker.random.word(),
			vehicle: faker.random.word(),
		},
		users: [],
		rideCount: faker.random.number({ min: 0, max: 100 }),
	},
	{
		groupId: faker.random.number(32).toString(),
		name: faker.random.word(),
		// code: faker.random.alphaNumeric(3),
		userCount: faker.random.number({ min: 0, max: 20 }),
		// owner: faker.random.alphaNumeric(32),
		location: {
			longitude: faker.random.number({ min: 51, max: 53, precision: 0.000001 }),
			latitude: faker.random.number({ min: 15, max: 17, precision: 0.0000001 }),
		},
		code: faker.random.word(),
		owner: {
			appUserId: faker.random.number(32).toString(),
			firstName: faker.random.word(),
			lastName: faker.random.word(),
			vehicle: faker.random.word(),
		},
		users: [],
		rideCount: faker.random.number({ min: 0, max: 100 }),
	},
	{
		groupId: faker.random.number(32).toString().toString(),
		name: faker.random.word(),
		// code: faker.random.alphaNumeric(3),
		userCount: faker.random.number({ min: 0, max: 20 }),
		// owner: faker.random.alphaNumeric(32),
		location: {
			longitude: faker.random.number({ min: 51, max: 53, precision: 0.000001 }),
			latitude: faker.random.number({ min: 15, max: 17, precision: 0.0000001 }),
		},
		code: faker.random.word(),
		owner: {
			appUserId: faker.random.number(32).toString(),
			firstName: faker.random.word(),
			lastName: faker.random.word(),
			vehicle: faker.random.word(),
		},
		users: [],
		rideCount: faker.random.number({ min: 0, max: 100 }),
	},
];

export default exampleGroups;
