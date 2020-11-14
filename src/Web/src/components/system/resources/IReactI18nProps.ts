import { WithTranslation } from "react-i18next";
import { TFunction, i18n } from "i18next";

/** I18n library props interface */
export interface IReactI18nProps extends WithTranslation {
	t: TFunction;
	i18n: i18n;
}
