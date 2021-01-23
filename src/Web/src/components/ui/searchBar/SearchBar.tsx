import React from "react";
import Input from "../input/Input";
import { InputType } from "../input/enums/InputType";
import { InputIcon } from "../input/enums/InputIcon";

interface ISearchBarProps {
	keyword: string;
	setKeyword: (keyword: string) => void;
}

const SearchBar = (props: ISearchBarProps) => {
	const BarStyling: React.CSSProperties = {
		// width: "20rem",
		// // background: "#F2F1F9",
		// border: "none",
		// padding: "0.5rem",
	};
	return (
		<Input
			cssProps={BarStyling}
			value={props.keyword}
			placeholder={"Search rides"}
			type={InputType.Text}
			changeHandler={(nv) => {
				props.setKeyword(nv);
			}}
			icon={InputIcon.Search}
		/>
	);
};

export default SearchBar;
