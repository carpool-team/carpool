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
import * as emailjs from "emailjs-com";


interface IHelpFormProps extends IReactI18nProps {
}

interface IEmailData {
	title: string;
	body: string;
}

const resources = {
	title: "helpForm.titleInput",
	body: "helpForm.bodyInput",
	send: "helpForm.send",
	application: "helpForm.application",
	helpLabel: "helpForm.helpLabel",
	validateMsg: "helpForm.validateMsg"
};

const cssClasses = {
	container: "helpForm",
	input: "helpForm__inputs--input",
	form: "helpForm__inputs--form",
	combo: "helpForm__inputs--combo",
	inputs: "helpForm__inputs",
	image: "helpForm__image",
};
const application = {
	Web: "Web",
	Mobile: "Mobile",
}
const emailUserID: string = process.env.EMAIL_USER_ID
const emailServiceID: string = process.env.EMAIL_SERVICE_ID
const webTemplateID: string = "template_x449sek"
const mobileTemplateID: string = "template_pd6ylot"


const HelpForm: (props: IHelpFormProps) => JSX.Element = props => {
	const { t } = props;

	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");
	const [app, setApp] = useState<string>(application.Web);
	const [validateBody, setValidateBody] = useState({ error: true, helper: "" });
	const [validateTitle, setValidateTitle] = useState({ error: true, helper: "" });

	const handleCombobox = (event: React.ChangeEvent<{ value: unknown }>) => {
		setApp(event.target.value as string);
	}

	useEffect(() => {
		if (!title) {
			setValidateTitle({ error: true, helper: t(resources.validateMsg) });
		} else {
			setValidateTitle({ error: false, helper: "" })
		}
		if (!body) {
			setValidateBody({ error: true, helper: t(resources.validateMsg) });
		} else {
			setValidateBody({ error: false, helper: "" });
		}
	}, [title, body])

	const templateParams = {
		subject: title,
		message: body
	};

	const trySend = () => {


		if (!validateBody.error && !validateTitle.error) {
			if (app === application.Mobile) {
				emailjs.send(emailServiceID, mobileTemplateID, templateParams, emailUserID)
			} else {
				emailjs.send(emailServiceID, webTemplateID, templateParams, emailUserID)
			}
		}
	}

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.inputs}>
				<span>{t(resources.helpLabel)}</span>
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
						error={validateTitle.error}
						helperText={validateTitle.helper}
						label={t(resources.title)}
						fullWidth
						className={cssClasses.input}
						rows={1}
						value={title}
						onChange={event => setTitle(event.target.value)}
					/>
					<TextField
						error={validateBody.error}
						label={t(resources.body)}
						helperText={validateBody.helper}
						multiline
						fullWidth
						className={cssClasses.input}
						rows={8}
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
			</div>
			<div className={cssClasses.image}>
			</div>

		</div >
	);
};

export default withTranslation()(HelpForm);
