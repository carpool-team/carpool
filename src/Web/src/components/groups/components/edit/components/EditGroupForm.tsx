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
import { Popover } from "@material-ui/core";

const geocodingClient = getGeocodingClient();

interface IEditGroupProps extends IReactI18nProps {
	group: IGroup;
}

const EditGroup: (props: IEditGroupProps) => JSX.Element = props => {
	const [inputsValid, setInputsValid] = useImmer({
		name: false,
		code: false,
		location: false,
	});
	const [validate, setValidate] = useState(false);
	const [addressCoordinates, setAddressCoordinates] = useState<ILocation>(props.group.location);
	const [loading, setLoading] = useState<boolean>(null);
	const [placeName, setPlaceName] = useState<string>(null);
	const [popover, setPopover] = useState<boolean>(false);

	//Podpiąć akcję zapisywania edycji grupy 
	const submitBtnClick = () => {
		if (each(inputsValid, i => i)) {


			setValidate(false);
		} else {
			setValidate(true);
		}
	};

	const onGetName = async (coords: [number, number]) => {
		try {
			setLoading(true);
			const response = await geocodingClient
				.reverseGeocode({
					query: coords,
					mode: "mapbox.places",
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
		onGetName(parseCoords(props.group.location))
	}, [])

	const handleOpenPopover = () => {
		setPopover(true);
	};

	const handleClosePopover = () => {
		setPopover(false);
	};

	//Podpiąć akcję usuwania grupy
	const onDeleteSubmit = () => {
		handleClosePopover();
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

	const dataKeys = {
		groupName: "group.groupName",
		code: "group.code",
		address: "group.address",
		location: "group.location",
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
		no: "no"
	};

	const { t } = props;

	return (
		<div className={cssClasses.container}>
			<div className={cssClasses.inputs}>
				<span>{t(resources.basicInfo)}</span>
				<Input
					type={InputType.Text}
					changeHandler={newValue => { }}
					placeholder={t(resources.groupNameInput)}
					value={props.group.name}
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
					changeHandler={newValue => { setPlaceName(newValue) }}
					placeholder={t(resources.addressInput)}
					value={placeName}
					icon={InputIcon.Location}
					addressCords={coords => {
						if (coords) {
							setAddressCoordinates({
								latitude: coords[1],
								longitude: coords[0],
							});
						} else {
							setAddressCoordinates(null);
						}
					}}
					validation={{
						type: ValidationType.Address,
						isValidCallback: isValid => {
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
					<MapBoxPicker location={addressCoordinates} label={placeName} />
				</div>
			</MediaQuery>
		</div>
	);
};

export default withTranslation()(EditGroup);
