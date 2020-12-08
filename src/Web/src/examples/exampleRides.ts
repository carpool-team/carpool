import * as faker from "faker";
import { IRide } from "../components/groups/interfaces/IRide";
import moment from "moment";

const exampleRides: IRide[] = [
	{
		id: faker.random.alphaNumeric(32),
		ownerId: faker.random.alphaNumeric(32),
		owner: {
			userId: faker.random.alphaNumeric(32),
			firstName: "Maciej",
			lastName: "Sobkowiak",
			vehicle: "Mazda ostra jazda",
		},
		participants: null,
		stops: null,
		destination: {
			longitude: 52.435932,
			latitude: 17.029413
		},
		startingLocation: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		date: moment()
		.add(0, "days")
		.format(),
		isUserParticipant: faker.random.boolean(),
		group: null,
		groupId: faker.random.alphaNumeric(32)

	},
	{
		id: faker.random.alphaNumeric(32),
		ownerId: faker.random.alphaNumeric(32),
		owner: {
			userId: faker.random.alphaNumeric(32),
			firstName: "Maciej",
			lastName: "Sobkowiak",
			vehicle: "Mazda ostra jazda",
		},
		participants: null,
		stops: null,
		destination: {
			longitude: 52.435932,
			latitude: 17.029413
		},
		startingLocation: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		date: moment()
		.add(0, "days")
		.format(),
		isUserParticipant: faker.random.boolean(),
		group: null,
		groupId: faker.random.alphaNumeric(32)

	},
	{
		id: faker.random.alphaNumeric(32),
		ownerId: faker.random.alphaNumeric(32),
		owner: {
			userId: faker.random.alphaNumeric(32),
			firstName: "Maciej",
			lastName: "Sobkowiak",
			vehicle: "Mazda ostra jazda",
		},
		participants: null,
		stops: null,
		destination: {
			longitude: 52.435932,
			latitude: 17.029413
		},
		startingLocation: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		date: moment()
		.add(0, "days")
		.format(),
		isUserParticipant: faker.random.boolean(),
		group: null,
		groupId: faker.random.alphaNumeric(32)

	},
	{
		owner: {
			userId: faker.random.alphaNumeric(32),
			firstName: "Julian",
			lastName: "Kobryński",
			vehicle: "Gaz full pizda",
		},
		id: faker.random.alphaNumeric(32),
		ownerId: faker.random.alphaNumeric(32),
		participants: null,
		stops: null,
		destination: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		startingLocation: {
			longitude: 52.403536,
			latitude: 16.866356
		},
		date: moment()
		.add(1, "days")
		.format(),
		isUserParticipant: faker.random.boolean(),
		group: null,
		groupId: faker.random.alphaNumeric(32)

	},
	{
		owner: {
			userId: faker.random.alphaNumeric(32),
			firstName: "Michał",
			lastName: "Dulski",
			vehicle: "Deskorolka",
		},
		id: faker.random.alphaNumeric(32),
		ownerId: faker.random.alphaNumeric(32),
		participants: null,
		stops: null,
		destination: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		startingLocation: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		date: moment()
		.add(2, "days")
		.format(),
		isUserParticipant: faker.random.boolean(),
		group: null,
		groupId: faker.random.alphaNumeric(32)
	},
	{
		owner: {
			userId: faker.random.alphaNumeric(32),
			firstName: "Michał",
			lastName: "Dulski",
			vehicle: "Deskorolka",
		},
		id: faker.random.alphaNumeric(32),
		ownerId: faker.random.alphaNumeric(32),
		participants: null,
		stops: null,
		destination: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		startingLocation: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		date: moment()
		.add(2, "days")
		.format(),
		isUserParticipant: faker.random.boolean(),
		group: null,
		groupId: faker.random.alphaNumeric(32)
	},
	{
		owner: {
			userId: faker.random.alphaNumeric(32),
			firstName: "Michał",
			lastName: "Dulski",
			vehicle: "Deskorolka",
		},
		id: faker.random.alphaNumeric(32),
		ownerId: faker.random.alphaNumeric(32),
		participants: null,
		stops: null,
		destination: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		startingLocation: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		date: moment()
		.add(2, "days")
		.format(),
		isUserParticipant: faker.random.boolean(),
		group: null,
		groupId: faker.random.alphaNumeric(32)
	}
];
export default exampleRides;
