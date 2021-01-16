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
	ridesInGroup: faker.random.number(1000),
	passengersInGroup: faker.random.number(1000)
};
export default exampleReport;
