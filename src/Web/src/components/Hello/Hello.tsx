import React from "react";

/** Props of Hello component */
export interface HelloProps {
	message?: string;
}

export const Hello = (props: HelloProps) => (
	<h1>{props.message ? props.message : "Hello!"}</h1>
);
