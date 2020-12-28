import React from 'react';
import NavBar from "../src/components/navBar/NavBar";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import loggedokenInfo from "../__mocks__/LoggedIAuthState.mock"
import mockPaths from "../__mocks__/paths.mock"
const mockStore = configureStore([]);

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
	Map: () => ({})

}));

describe("Logged NavBar", () => {
	let store;
	let component;

	beforeEach(() => {
		store = mockStore({
			auth: loggedokenInfo
		});

		store.dispatch = jest.fn();

		component = renderer.create(
			<Provider store={store}>
				<NavBar />
			</Provider>
		);
	});

	it('should render NavBar', () => {
		expect(component.toJSON()).toMatchSnapshot();
	});
	it('should display loged buttons', () => {
		renderer.act(() => {
			component.root.findByProps({ href: mockPaths.profile }).props.onClick();
		});
	});
})

