import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

new Promise((resolve, _reject) => {
	resolve();
}).then(() => {
	import("./App").then(App => {
		const Root: () => JSX.Element = () => (
			<I18nextProvider i18n={i18n}>
				<App.default />
			</I18nextProvider>
		);
		ReactDOM.render(<Root />, document.getElementById("root"));
	});
}).catch(err => {
	throw new Error("Błąd aplikacji: " + err);
});
