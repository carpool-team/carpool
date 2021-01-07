import React from 'react'
import ActiveItemRequestOwner from '../src/components/shared/ridesList/components/items/ActiveItemRequestOwner'
import { render } from '@testing-library/react'
import faker from "faker";
import { IRideRequest } from '../src/components/groups/interfaces/IRideRequest';

describe('ActiveItemRequestOwner', () => {
	faker.seed(123)

	const request: IRideRequest = {
		isAccepted: false,
		isPending: true,
		requestingUser: {
			appUserId: faker.random.alphaNumeric(32),
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
		},
		ride: {
			rideId: faker.random.alphaNumeric(32),
			owner: {
				id: faker.random.alphaNumeric(32),
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				vehicle: faker.random.word(),
				rating: 0
			},
			stops: null,
			location: {
				longitude: faker.random.number({ min: 51, max: 53, precision: 0.000001 }),
				latitude: faker.random.number({ min: 15, max: 17, precision: 0.0000001 }),
			},
			rideDate: faker.date.future(1, new Date(2020, 0, 0)),
			group: {
				groupId: faker.random.number(32).toString(),
				name: faker.random.word(),
				userCount: faker.random.number({ min: 0, max: 20 }),
				location: {
					longitude: faker.random.number({ min: 51, max: 53, precision: 0.000001 }),
					latitude: faker.random.number({ min: 15, max: 17, precision: 0.0000001 }),
				},
			},
			rideDirection: 0,
			price: 0
		},
		rideOwner: {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			id: faker.random.alphaNumeric(32),
			rating: 0
		},
		rideRequestId: faker.random.alphaNumeric(32)
	}

	const word = faker.random.word()

	const props = {
		request,
		color: '#ddd',
		setRequest: jest.fn(),
		t: jest.fn(() => word),
		answerCallback: jest.fn()
	}

	it('should match snapshot', async () => {
		const { container } = render(<ActiveItemRequestOwner {...props} />)
		expect(await container.firstChild).toMatchSnapshot()
	})
})
