import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useImmer } from "use-immer";
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import { InputType } from "../ui/input/enums/InputType";
import Input from "../ui/input/Input";
import "./HelpForm.scss"
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Button from "../ui/button/Button";
import { ButtonBackground } from "../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../ui/button/enums/ButtonColor";

interface IHelpFormProps extends IReactI18nProps {
}

interface IUserAutocompleteData {
	[email: string]: {
		firstName: string;
		lastName: string;
		appUserId: string;
	};
}

const resources = {
	title: "helpForm.titleInput",
	body: "helpForm.bodyInput",
	send: "helpForm.send",
	application: "helpForm.application"
};

const cssClasses = {
	container: "helpForm",
	input: "helpForm--input",
	form: "helpForm--form",
	combo: "helpForm--combo"
};
const application = {
	Web: "Web",
	Mobile: "Mobile"
}

const HelpForm: (props: IHelpFormProps) => JSX.Element = props => {
	const { t } = props;

	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");
	const [app, setApp] = useState<string>(null);

	const handleCombobox = (event: React.ChangeEvent<{ value: unknown }>) => {
		console.log(event.target.value);
		setApp(event.target.value as string);
	}
	const trySend = () => {

	}

	return (
		<div className={cssClasses.container}>
			<form className={cssClasses.form} noValidate autoComplete="off">
				<FormControl className={cssClasses.input}>
					<InputLabel id="application">{t(resources.application)}</InputLabel>
					<Select
						labelId="application"
						className={cssClasses.combo}
						value={app}
						onChange={handleCombobox}
					>
						<MenuItem value={application.Web}>{application.Web}</MenuItem>
						<MenuItem value={application.Mobile}>{application.Mobile}</MenuItem>
					</Select>
				</FormControl>
				<TextField
					label={t(resources.title)}
					fullWidth
					className={cssClasses.input}
					rows={1}
					value={title}
					onChange={event => setTitle(event.target.value)}
				/>
				<TextField
					label={t(resources.body)}
					multiline
					fullWidth
					className={cssClasses.input}
					rows={10}
					value={body}
					onChange={event => setBody(event.target.value)}
				/>
			</form>
			<Button
				background={ButtonBackground.Blue}
				color={ButtonColor.White}
				onClick={() => trySend()}>
				{t(resources.send)}
			</Button>
		</div >
	);
};

export default withTranslation()(HelpForm);
