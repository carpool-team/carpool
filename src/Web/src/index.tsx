import React from "react";
import ReactDOM from "react-dom";

new Promise((resolve, _reject) => {
	resolve();
}).then(() => {
	import("./App").then(App => {
		const Root: () => JSX.Element = () => <App.default />;
		ReactDOM.render(<Root />, document.getElementById("root"));
	});
}).catch(err => {
	throw new Error("Błąd aplikacji: " + err);
});
