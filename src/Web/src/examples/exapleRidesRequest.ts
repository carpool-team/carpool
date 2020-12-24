import { IRideRequest } from "../components/groups/interfaces/IRideRequest";
import * as faker from "faker";
import moment from "moment";

const exampleRidesRequest: IRideRequest = {
	isAccepted: false,
	isPending: true,
	requestingUser: {
		appUserId: "785546406021562368",
		firstName: "John",
		lastName: "Doe"
	},
	ride: {
		rideId: faker.random.alphaNumeric(32),
		owner: {
			id: faker.random.alphaNumeric(32),
			firstName: "Maciej",
			lastName: "Sobkowiak",
			vehicle: "Mazda ostra jazda",
			rating: 0
		},
		stops: null,
		location: {
			longitude: 52.40656926303501,
			latitude: 16.86633729745128
		},
		rideDate: new Date(),
		group: null,
		rideDirection: 0,
		price: 0

	},
	rideOwner: {
		firstName: "Julian",
		id: "788498174779064320",
		lastName: "Kobrynski",
		rating: 0
	},
	rideRequestId: "790720077187006464"
}
