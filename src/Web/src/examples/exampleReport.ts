import * as faker from "faker";
import { fake } from "faker";
import { IReport } from "../components/groups/interfaces/IReport";

const exampleReport: IReport = {
	drivers: [
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		}
	],
	passengers: [
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		},
		{
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rideCount: faker.random.number(50)
		}
	],
	ridesCount: faker.random.number(1000),
	passengerCount: faker.random.number(1000),
	group: {
		groupId: faker.random.alphaNumeric(32),
		location: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128,
		},
		userCount: faker.random.number(25),
		ownerId: faker.random.alphaNumeric(32),
		name: faker.random.word(),
	}
};
export default exampleReport;
