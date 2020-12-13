import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { Resource } from "./enums/Resource";

interface IAutocompleteTextInputProps extends IReactI18nProps {
	placeholder: string;
	onChange: (newValue: string) => void;
	onSelect?: () => void;
	autocompleteCallback: (value: string) => Promise<string[]>;
	wrapperStyle?: React.CSSProperties;
	textFieldStyle?: React.CSSProperties;
}

const AutocompleteTextInput: React.FunctionComponent<IAutocompleteTextInputProps> = props => {
	const { t } = props;
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<string[]>([]);
	const [value, setValue] = useState<string>(null);
	const [refresh, setRefresh] = useState<boolean>(false);
	const loading = open && refresh;

	useEffect(() => {
		let active = true;
		if (!loading || !refresh) {
			return undefined;
		}
		props.autocompleteCallback(value).then(res => {
			setOptions(res);
		});
		setRefresh(false);
		return () => {
			active = false;
		};
	}, [loading, refresh]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	useEffect(() => {
		setRefresh(true);
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
			onClose={(_event, reason) => {
				setOpen(false);
				setValue(null);
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
			}}
			onInputChange={(_event, newValue, _reason) => {
				setValue(newValue);
			}}
			noOptionsText={t(Resource.NoOptionsText)}
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

export default withTranslation()(AutocompleteTextInput);
