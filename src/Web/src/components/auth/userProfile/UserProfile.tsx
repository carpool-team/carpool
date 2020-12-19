import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useImmer } from "use-immer";
import { IReactI18nProps } from "../../system/resources/IReactI18nProps";
import { InputType } from "../../ui/input/enums/InputType";
import Input from "../../ui/input/Input";
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import Button from "../../ui/button/Button";
import { ButtonBackground } from "../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../ui/button/enums/ButtonColor";
import * as emailjs from "emailjs-com";


interface IUserProfileProps extends IReactI18nProps {
}

const resources = {

};

const cssClasses = {

};


const UserProfile: React.FC<IUserProfileProps> = (props) => {
	const { t } = props;


	const trySend = () => {

	}

	return (
		<div >
			fhdajksfdas
		</div >
	);
};

export default withTranslation()(UserProfile);
