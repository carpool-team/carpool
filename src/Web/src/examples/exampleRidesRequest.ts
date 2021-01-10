import { IRideRequest } from "../components/groups/interfaces/IRideRequest";
import * as faker from "faker";
import moment from "moment";

export const exampleRidesRequest: IRideRequest[] = [
	{
		isAccepted: false,
		isPending: true,
		requestingUser: {
			appUserId: "785546406021562368",
			firstName: "John",
			lastName: "Doe"
		},
		ride: {
			id: faker.random.alphaNumeric(32),
			location: {
				longitude: 52.40656926303501,
				latitude: 16.86633729745128
			},
			date: new Date(),
			group: {
				groupId: faker.random.number(32).toString(),
				name: faker.random.word(),
				location: {
					longitude: faker.random.number({ min: 51, max: 53, precision: 0.000001 }),
					latitude: faker.random.number({ min: 15, max: 17, precision: 0.0000001 }),
				},
			},
			rideDirection: 0,
		},
		rideOwner: {
			firstName: "Julian",
			id: "788498174779064320",
			lastName: "Kobrynski",
			rating: 0
		},
		rideRequestId: "790720077187006464"
	},
	{
		isAccepted: true,
		isPending: false,
		requestingUser: {
			appUserId: "785546406021562368",
			firstName: "John",
			lastName: "Doe"
		},
		ride: {
			id: faker.random.alphaNumeric(32),
			location: {
				longitude: 52.40656926303501,
				latitude: 16.86633729745128
			},
			date: new Date(),
			group: {
				groupId: faker.random.number(32).toString(),
				name: faker.random.word(),
				location: {
					longitude: faker.random.number({ min: 51, max: 53, precision: 0.000001 }),
					latitude: faker.random.number({ min: 15, max: 17, precision: 0.0000001 }),
				},
			},
			rideDirection: 0,
		},
		rideOwner: {
			firstName: "Julian",
			id: "788498174779064320",
			lastName: "Kobrynski",
			rating: 0
		},
		rideRequestId: faker.random.alphaNumeric(32)
	}
];
