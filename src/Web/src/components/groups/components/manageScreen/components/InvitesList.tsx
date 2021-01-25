import React from "react";
import { withTranslation } from "react-i18next";
import { LoadingStatus } from "../../../../shared/enum/LoadingStatus";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import LabelBlock from "../../../../ui/labelBlock/LabelBlock";
import LoaderBlock from "../../../../ui/loaderBlock/LoaderBlock";
import { IInvite } from "../../../interfaces/IInvite";

interface IInvitesListProps extends IReactI18nProps {
	getInvitesCallback: () => IInvite[];
	answerInviteCallback: (accepted: boolean, id: string) => void;
	setInviteSelected: (invite: IInvite) => void;
	loadingStatus: LoadingStatus;
}

const InvitesList = (props: IInvitesListProps) => {
	const listCssClass: string = "groupsManagementList";
	const labelCssClass: string = "groupsManagementList--label";
	const buttonAcceptCssClass: string = "listSmallButton--accept";
	const buttonDeclineCssClass: string = "listSmallButton--decline";
	const pinCssClass: string = "groupsManagementList--pin";
	const buttonCssClass: string = "groupsManagementList--button";

	const invites: IInvite[] = props.getInvitesCallback().filter(i => i.isPending);

	const resources = {
		noInvites: "invitesList.noInvitesLabel",
		getError: "invitesList.getErrorLabel",
	};

	let colorList: string[] = ["#C39BD3", "#7FB3D5", "#48C9B0", "#F9E79F"];
	let colorIndex: number = 0;

	const renderItems = () => {
		switch (props.loadingStatus) {
			case LoadingStatus.Loading:
				return <LoaderBlock />;
			case LoadingStatus.Error:
				return <LabelBlock text={props.t(resources.getError)} />;
			case LoadingStatus.Success:
			default:
				if (invites && invites.length > 0) {
					return (
						invites.map((invite) => {
							++colorIndex;
							const color = {
								color: colorList[colorIndex % colorList.length]
							};
							return (
								<li key={invite.groupInviteId}>
									<button
										onClick={() => props.setInviteSelected(invite)}
										className={buttonCssClass}
									>
										<div className={pinCssClass} style={color}>
										</div>
										<div className={labelCssClass}>
											{invite.groupDto.name}
										</div>
									</button>
									<button className={buttonAcceptCssClass} onClick={() => props.answerInviteCallback(true, invite.groupInviteId)}></button>
									<button className={buttonDeclineCssClass} onClick={() => props.answerInviteCallback(false, invite.groupInviteId)}></button>
								</li>
							);
						})
					);
				} else {
					return <LabelBlock text={props.t(resources.noInvites)} />;
				}
		}
	};

	return (
		<ul className={listCssClass}>
			{renderItems()}
		</ul>
	);
};

export default withTranslation()(InvitesList);
