import * as faker from "faker";
import { IRide } from "../components/groups/interfaces/IRide";

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
		date: "2020-11-07T18:10:46.1252449",
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
		date: "2020-11-07T18:10:46.1252449",
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
		date: "2020-11-07T18:10:46.1252449",
		isUserParticipant: faker.random.boolean(),
		group: null,
		groupId: faker.random.alphaNumeric(32)

	}

];
export default exampleRides;
