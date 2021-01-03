import React from 'react';
import NavBar from "../src/components/navBar/NavBar";
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { fireEvent, render, queryByAttribute } from "@testing-library/react"
const mockStore = configureStore([]);
import faker from "faker";
import { IAuthState } from '../src/components/auth/store/State';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import { act } from 'react-dom/test-utils';
import { logout } from '../src/components/auth/store/Actions';

const renderComponent = (store: any) => (
	<I18nextProvider i18n={i18n}>
		<Provider store={store}>
			<NavBar />
		</Provider>
	</I18nextProvider>
)

describe("NavBar", () => {
	faker.seed(1)

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

	it('should match snapshot', () => {
		const { container } = render(renderComponent(store))

		expect(container).toMatchSnapshot()
	})

	it('should render log in button', () => {
		const { queryByText } = render(renderComponent(store))


		expect(queryByText('Zaloguj się')).not.toBeNull()
		expect(queryByText('Wyloguj się')).toBeNull()
	})

	it('should click logout button', async () => {
		authStore.tokenInfo.token = faker.random.alphaNumeric(32)
		store = mockStore({
			auth: authStore
		});

		// Destrukturyzacja
		const { getByText, queryByText } = render(renderComponent(store))

		expect(getByText('Wyloguj się')).not.toBeNull()
		expect(queryByText('Zaloguj się')).toBeNull()

		await act(async () => {
			fireEvent.click(getByText('Wyloguj się'))
		})

		const dispatched = store.getActions()
		expect(dispatched).toContainEqual(logout())
	})

	it('should show and click hamburger button', async () => {
		const { container } = render(renderComponent(store))

		expect(container.querySelector('#hamburgerIcon')).not.toBeNull()
		expect(container.querySelector('#hamburgerIcon').className).toEqual('hamburgerIcon')

		await act(async () => {
			fireEvent.click(container.querySelector('#hamburgerIcon'))
		})

		expect(container.querySelector('#hamburgerIcon').className).toEqual('hamburgerIcon change')

		await act(async () => {
			fireEvent.click(container.querySelector('#hamburgerIcon'))
		})

		expect(container.querySelector('#hamburgerIcon').className).toEqual('hamburgerIcon')
	})
})

