import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello/Hello";

ReactDOM.render(
  <Hello message={"Testing TS with React"} />,
  document.getElementById("example")
);
