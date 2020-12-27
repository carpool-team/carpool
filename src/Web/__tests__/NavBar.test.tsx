import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from "../src/components/navBar/NavBar";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createRenderer } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

const mockStore = configureStore([]);

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
	Map: () => ({})
}));

describe("NavBar", () => {
	let store;
	let component;

	beforeEach(() => {
		store = mockStore({
			auth: {
				tokenInfo: {
					token: "tests",
					expires: new Date,
					refreshToken: {
						created: new Date,
						expires: new Date,
						isActive: true,
						isExpired: false,
						revoked: "tre",
						token: "test",
					},
					payload: {
						/** Subject (AUTH ID) */
						sub: "test",
						/** Scope */
						scope: "test",
						/** JWT Id */
						jti: "test",
						/** Issuer */
						iss: "test",
						/** Issued at */
						iat: "test",
						/** Expiration time */
						exp: "test",
						/** Audience */
						aud: "test",
					},
				}
			},
		});

		component = renderer.create(
			<Provider store={store}>
				<NavBar />
			</Provider>
		);
	});

	it('should render with given state from Redux store', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});
	it('should dispatch an action on button click', () => {

	});
})

