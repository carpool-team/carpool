import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

interface IAutocompleteTextInputProps {
	placeholder: string;
	onChange: (newValue: string) => void;
	autocompleteCallback: () => Promise<string[]>;
	wrapperStyle?: React.CSSProperties;
	textFieldStyle?: React.CSSProperties;
}

const AutocompleteTextInput: React.FunctionComponent<IAutocompleteTextInputProps> = props => {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState<string[]>([]);
	const loading = open && options.length === 0;

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const res = await props.autocompleteCallback();

			if (active) {
				setOptions(res);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	const onChangeInput: (event: React.ChangeEvent) => void = event => {
		props.onChange(event.target.nodeValue);
	}

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
			getOptionSelected={(option, value) => option === value}
			getOptionLabel={(option) => option}
			options={options}
			loading={loading}
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
}

export default AutocompleteTextInput;
