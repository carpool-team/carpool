import React from 'react';
import NavBar from "../src/components/navBar/NavBar";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import unlogedTokenInfo from "../__mocks__/UnLoggedIAuthState.mock"
import mockPaths from "../__mocks__/paths.mock"
const mockStore = configureStore([]);

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
	Map: () => ({})

}));

describe("Unloged NavBar", () => {
	let store;
	let component;

	beforeEach(() => {
		store = mockStore({
			auth: unlogedTokenInfo
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
	it('should display unloged buttons', () => {
		renderer.act(() => {
			component.root.findByProps({ href: mockPaths.login }).props.onClick();
		});
	});
})

