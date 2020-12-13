import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { Resource } from "./enums/Resource";

interface IAutocompleteTextInputProps extends IReactI18nProps {
	placeholder: string;
	value: string;
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
	const [refresh, setRefresh] = useState<boolean>(false);
	const loading = open && refresh;

	useEffect(() => {
		let active = true;
		if (!loading || !refresh) {
			return undefined;
		}
		props.autocompleteCallback(props.value).then(res => {
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
		if (open) {
			setRefresh(true);
		}
	}, [props.value]);

	const onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void = event => {
		props.onChange(event.target.value);
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
				props.onChange(newValue);
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
					inputProps={{
						...params.inputProps,
						value: props.value ?? ""
					}}
				/>
			)}
		/>
	);
};

export default withTranslation()(AutocompleteTextInput);
