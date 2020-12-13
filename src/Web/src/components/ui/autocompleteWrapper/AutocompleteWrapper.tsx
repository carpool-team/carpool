import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

interface IAutocompleteTextInputProps {
	placeholder: string;
	onChange: (newValue: string) => void;
	onSelect?: () => void;
	autocompleteCallback: (value: string) => Promise<string[]>;
	wrapperStyle?: React.CSSProperties;
	textFieldStyle?: React.CSSProperties;
}

const AutocompleteTextInput: React.FunctionComponent<IAutocompleteTextInputProps> = props => {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState<string[]>([]);
	const [value, setValue] = React.useState<string>(null);
	const loading = open && options.length === 0;

	useEffect(() => {
		let active = true;
		if (!loading) {
			return undefined;
		}
		props.autocompleteCallback(value).then(res => {
			setOptions(res);
		});
		return () => {
			active = false;
		};
	}, [loading]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	useEffect(() => {
		setOptions([]);
	}, [value]);

	const onChangeInput: (event: React.ChangeEvent) => void = event => {
		props.onChange(event.target.nodeValue);
	};

	return (
		<Autocomplete
			style={props.wrapperStyle}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			getOptionSelected={(option, newValue) => option === newValue}
			getOptionLabel={(option) => option}
			options={options}
			loading={loading}
			onChange={(_event, newValue) => {
				if (props.onSelect) {
					props.onSelect();
				}
				props.onChange(newValue);
				console.log("ON CHANGE");
			}}
			onInputChange={(_event, newValue, _reason) => {
				console.log("ON INPUT CHANGE. NEW VAL: ", newValue);
				setValue(newValue);
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label={props.placeholder}
					style={props.textFieldStyle}
					onChange={onChangeInput}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<React.Fragment>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</React.Fragment>
						),
					}}
				/>
			)}
		/>
	);
};

export default AutocompleteTextInput;
