import React from "react";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import { LoaderSpinner } from "../ui/loaderSpinner/LoaderSpinner";

interface HelloProps extends IReactI18nProps { }

const Hello = (props: HelloProps) => {
	const { t } = props;

	return (
		<React.Fragment>
			<h1>{t("title")}</h1>
			<LoaderSpinner />
		</React.Fragment>
	);
};

export default withTranslation()(Hello);