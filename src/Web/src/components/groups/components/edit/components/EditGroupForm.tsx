import React, { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import Input from "../../../../ui/input/Input";
import Button from "../../../../ui/button/Button";
import { ButtonBackground } from "../../../../ui/button/enums/ButtonBackground";
import { ButtonColor } from "../../../../ui/button/enums/ButtonColor";
import { withTranslation } from "react-i18next";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { InputType } from "../../../../ui/input/enums/InputType";
import { InputIcon } from "../../../../ui/input/enums/InputIcon";
import MapBoxPicker from "../../../../map/MapBoxPicker";
import { ValidationType } from "../../../../ui/input/enums/ValidationType";
import { useImmer } from "use-immer";
import { ILocation } from "../../../interfaces/ILocation";
import { each, parseCoords } from "../../../../../helpers/UniversalHelper";
import { IGroup } from "../../../interfaces/IGroup";
import { getGeocodingClient } from "../../../../map/MapBoxHelper";
import { formatMs, Popover } from "@material-ui/core";
import { ButtonLinkColor } from "../../../../ui/buttonLink/enums/ButtonLinkColor";
import ButtonLink from "../../../../ui/buttonLink/ButtonLink";
import { ButtonLinkBackground } from "../../../../ui/buttonLink/enums/ButtonLinkBackground";
import { ButtonLinkUnderline } from "../../../../ui/buttonLink/enums/ButtonLinkUnderline";
import { mainRoutes } from "../../../../layout/components/LayoutRouter";
import GroupsRouter from "../../GroupsRouter";
import { deleteGroup, editGroup } from "../../../store/Actions";
import { IDeleteGroupAction, IEditGroupAction } from "../../../store/Types";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { IEditGroupFormData } from "../interfaces/IEditGroupFormData";

const geocodingClient = getGeocodingClient();

interface IDispatchPropsType {
	deleteGroup: (groupId: string) => IDeleteGroupAction;
	editGroup: (data: IEditGroupFormData, groupId: string) => IEditGroupAction;
}

const mapDispatchToProps: IDispatchPropsType = {
	deleteGroup,
	editGroup,
};

export type DispatchProps = typeof mapDispatchToProps;

interface IEditGroupProps extends IReactI18nProps, DispatchProps {
	group: IGroup;
}

const EditGroup: (props: IEditGroupProps) => JSX.Element = props => {
	const [inputsValid, setInputsValid] = useImmer({
		name: true,
		location: true,
	});
	const [formData, setFormData] = useImmer<IEditGroupFormData>({
		name: props.group.name,
		location: props.group.location,
	});
	const [validate, setValidate] = useState(false);
	const [loading, setLoading] = useState<boolean>(null);
	const [placeName, setPlaceName] = useState<string>(null);
	const [popover, setPopover] = useState<boolean>(false);
	const history = useHistory();

	const compareDataToGroup = () => (
		props.group.location !== formData.location
		|| props.group.name !== formData.name
	);

	const validateForm = () => {
		let isFormValid: boolean = true;
		const edited = compareDataToGroup();
		if (each(inputsValid, i => i) && edited) {
			isFormValid = true;
			setValidate(false);
		} else if (edited) {
			isFormValid = false;
			setValidate(true);
		}
		return isFormValid && edited;
	};

	const submitBtnClick = () => {
		console.log(inputsValid);
		if (validateForm()) {
			console.log("submitting grouup edit");
			props.editGroup(formData, props.group.groupId);
		}

	};

	const onGetName = async (coords: [number, number]) => {
		try {
			setLoading(true);
			const response = await geocodingClient
				.reverseGeocode({
					query: coords,
					mode: "mapbox.places",
					countries: ["PL"],
					language: ["PL"],
				})
				.send();
			const result = response.body.features[0];
			if (result !== undefined && result.hasOwnProperty("place_name")) {
				setPlaceName(result.place_name);
			} else {
				setPlaceName(" Błąd pobrania nazwy lokalizacji ");
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		onGetName(parseCoords(props.group.location));
	}, []);

	const handleOpenPopover = () => {
		setPopover(true);
	};

	const handleClosePopover = () => {
		setPopover(false);
	};

	const onDeleteSubmit = () => {
		props.deleteGroup(props.group.groupId);
		handleClosePopover();
		history.goBack();
	};

	const cssClasses = {
		container: "addGroupContainer",
		map: "addGroupFirstSide__map",
		inputs: "addGroupFirstSide__inputs",
		popoverContainer: "auth__popover",
		button: "auth__inputs--button",
		popupButtonsContainer: "auth__inputs--buttonContainer",
		buttonsContainer: "detailedView--buttonContainer"
	};

	const resources = {
		nextBtn: "nextBtn",
		groupNameInput: "groups.addGroupForm.groupName",
		groupCodeInput: "groups.addGroupForm.code",
		groupCodeInputComment: "groups.addGroupForm.codeInputComment",
		addressInput: "groups.addGroupForm.address",
		basicInfo: "groups.editGroupForm.basicInfo",
		submitBtn: "auth.userProfile.save",
		deleteBtn: "groups.editGroupForm.deleteBtn",
		deleteConfirm: "groups.editGroupForm.deleteConfirm",
		yes: "yes",
		no: "no",
		btnUsers: "groups.editGroupForm.btnUsers"
	};

	const { t } = props;

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.inputs}>
				<span>{t(resources.basicInfo)}</span>
				<Input
					type={InputType.Text}
					changeHandler={newValue => setFormData(draft => {
						draft.name = newValue;
					})}
					placeholder={t(resources.groupNameInput)}
					value={formData.name}
					icon={InputIcon.Globe}
					validation={{
						type: ValidationType.Required,
						isValidCallback: isValid => {
							setInputsValid(draft => {
								draft.name = isValid;
							});
						},
						validate
					}}
				/>
				<Input
					type={InputType.Address}
					changeHandler={newValue => { setPlaceName(newValue); }}
					placeholder={t(resources.addressInput)}
					value={placeName}
					icon={InputIcon.Location}
					addressCords={coords => {
						if (coords) {
							setFormData(draft => {
								draft.location = {
									latitude: coords[1],
									longitude: coords[0],
								};
							});
						} else {
							setFormData(draft => {
								draft.location = null;
							});
						}
					}}
					validation={{
						type: ValidationType.Address,
						isValidCallback: isValid => {
							console.log("EDIT GROUP LOCATION VALID: ", isValid);
							setInputsValid(draft => {
								draft.location = isValid;
							});
						},
						validate
					}}
				/>
				<div className={cssClasses.buttonsContainer} >
					<Button
						onClick={submitBtnClick}
						color={ButtonColor.White}
						background={ButtonBackground.Blue}
					>
						{t(resources.submitBtn)}
					</Button>
					<Button
						onClick={handleOpenPopover}
						color={ButtonColor.White}
						background={ButtonBackground.Red}
					>
						{t(resources.deleteBtn)}
					</Button>
				</div>
				<div >
					<ButtonLink
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
						undeline={ButtonLinkUnderline.Solid}
						to={`/${mainRoutes.groups}${GroupsRouter.routes.users}`}
					>
						{t(resources.btnUsers)}
					</ButtonLink>
				</div>
				<Popover
					open={popover}
					onClose={handleClosePopover}
					anchorOrigin={{
						vertical: "center",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "center",
						horizontal: "center",
					}}
				>
					<div className={cssClasses.popoverContainer}>
						<span>{t(resources.deleteConfirm)}</span>
						<div className={cssClasses.popupButtonsContainer}>
							<Button
								additionalCssClass={cssClasses.button}
								onClick={onDeleteSubmit}
								color={ButtonColor.White}
								background={ButtonBackground.Red}
							>
								{t(resources.yes)}
							</Button>
							<Button
								additionalCssClass={cssClasses.button}
								onClick={handleClosePopover}
								color={ButtonColor.White}
								background={ButtonBackground.Blue}
							>
								{t(resources.no)}
							</Button>
						</div>
					</div>
				</Popover>
			</div>
			<MediaQuery query="(min-width: 900px)">
				<div className={cssClasses.map}>
					<MapBoxPicker location={formData.location} label={placeName} />
				</div>
			</MediaQuery>
		</div>
	);
};

export default connect(null, mapDispatchToProps)(
	withTranslation()(EditGroup)
);
