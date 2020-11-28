import * as faker from "faker";
import { fake } from "faker";
import { IGroup } from "../components/groups/interfaces/IGroup";

const exampleGroups: IGroup[] = [
	{
		id: faker.random.alphaNumeric(32),
		name: faker.random.word(),
		code: faker.random.word(),
		userCount: faker.random.number({min: 0, max: 20}),
		owner: faker.random.alphaNumeric(32),
		location: {
			longitude: faker.random.number({min: 51, max: 53, precision: 0.000001}),
			latitude: faker.random.number({min: 15, max: 17, precision: 0.0000001}),
		},
		rideCount: faker.random.number({min: 0, max: 100}),
	},
	{
		id: faker.random.alphaNumeric(32),
		name: faker.random.word(),
		code: faker.random.word(),
		userCount: faker.random.number({min: 0, max: 20}),
		owner: faker.random.alphaNumeric(32),
		location: {
			longitude: faker.random.number({min: 51, max: 53, precision: 0.000001}),
			latitude: faker.random.number({min: 15, max: 17, precision: 0.0000001}),
		},
		rideCount: faker.random.number({min: 0, max: 100}),
	},
	{
		id: faker.random.alphaNumeric(32),
		name: faker.random.word(),
		code: faker.random.word(),
		userCount: faker.random.number({min: 0, max: 20}),
		owner: faker.random.alphaNumeric(32),
		location: {
			longitude: faker.random.number({min: 51, max: 53, precision: 0.000001}),
			latitude: faker.random.number({min: 15, max: 17, precision: 0.0000001}),
		},
		rideCount: faker.random.number({min: 0, max: 100}),
	},
	{
		id: faker.random.alphaNumeric(32),
		name: faker.random.word(),
		code: faker.random.word(),
		userCount: faker.random.number({min: 0, max: 20}),
		owner: faker.random.alphaNumeric(32),
		location: {
			longitude: faker.random.number({min: 51, max: 53, precision: 0.000001}),
			latitude: faker.random.number({min: 15, max: 17, precision: 0.0000001}),
		},
		rideCount: faker.random.number({min: 0, max: 100}),
	},
];

export default exampleGroups;
