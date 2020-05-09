import { Store } from "redux";
import { createStore } from "redux-dynamic-modules-core";
import { getObservableExtension } from "redux-dynamic-modules-observable";
import { getMainReduxModule } from "./Reducers";

const store: Store = createStore({
	extensions: [getObservableExtension()],
}, getMainReduxModule());

export default store;