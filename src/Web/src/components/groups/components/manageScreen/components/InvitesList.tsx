import React from "react";
import { IInvite } from "../../../interfaces/IInvite";

interface IInvitesListProps {
	getInvitesCallback: () => IInvite[];
	answerInviteCallback: (accepted: boolean, id: string) => void;
	setInviteSelected: (invite: IInvite) => void;
}

const InvitesList = (props: IInvitesListProps) => {
	const listCssClass: string = "groupsManagementList";
	const labelCssClass: string = "groupsManagementList--label";
	const buttonAcceptCssClass: string = "listSmallButton--accept";
	const buttonDeclineCssClass: string = "listSmallButton--decline";
	const pinCssClass: string = "groupsManagementList--pin";
	const buttonCssClass: string = "groupsManagementList--button";
	const invites: IInvite[] = props.getInvitesCallback().filter(i => i.isPending);

	let colorList: string[] = ["#C39BD3", "#7FB3D5", "#48C9B0", "#F9E79F"];
	let colorIndex: number = 0;

	return (
		<ul className={listCssClass}>
			{invites.map((invite) => {
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
			})}
		</ul>
	);
};

export default InvitesList;
