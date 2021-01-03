import React from 'react';
import NavBar from "../src/components/navBar/NavBar";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import mockPaths from "../__mocks__/paths.mock"
const mockStore = configureStore([]);
import faker from "faker";
import { IAuthState } from '../src/components/auth/store/State';


describe("Unloged NavBar", () => {
	faker.seed(1)

	let component;

	let authStore: IAuthState = {
		tokenInfo: {
			token: null,
			expires: faker.date.past(),
			refreshToken: {
				created: faker.date.past(),
				expires: faker.date.past(),
				isActive: false,
				isExpired: false,
				revoked: null,
				token: faker.random.alphaNumeric(32).toString(),
			},
			payload: {
				sub: faker.random.alphaNumeric(32).toString(),
				scope: faker.random.alphaNumeric(32).toString(),
				jti: faker.random.alphaNumeric(32).toString(),
				iss: faker.random.alphaNumeric(32).toString(),
				iat: faker.random.alphaNumeric(32).toString(),
				exp: faker.random.number(),
				aud: faker.random.alphaNumeric(32).toString(),
			},
		}
	}

	let store = mockStore({
		auth: authStore
	});
	store.dispatch = jest.fn();

	beforeEach(() => {
		component = renderer.create(
			<Provider store={store}>
				<NavBar />
			</Provider>
		);
	});

	it('should render NavBar', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});

	it('should display unloged buttons', () => {
		renderer.act(() => {
			component.root.findByProps({ href: mockPaths.login }).props.onClick();
		});
	});
})

