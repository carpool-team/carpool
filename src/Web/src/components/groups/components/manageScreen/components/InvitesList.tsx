import React from "react";
import ButtonAcceptDecline from "../../../../ui/Button/ButtonAcceptDecline";
import { ButtonSize } from "../../../../ui/Button/enums/ButtonSize";
import { ButtonType } from "../../../../ui/Button/enums/ButtonType";
import { ButtonShape } from "../../../../ui/Button/enums/ButtonShape";
import { IInvite } from "../../../interfaces/IInvite";

interface IInvitesListProps {
	getInvitesCallback: () => IInvite[];
	answerInviteCallback: (accepted: boolean, id: string) => void;
}

const InvitesList = (props: IInvitesListProps) => {
	const listCssClass: string = "groupList__list";

	const invites: IInvite[] = props.getInvitesCallback().filter(i => i.isPending);

	const renderInvite = (invite: IInvite) => {
		let key: string = invite.group?.name ?? invite.id;
		return (
			<li key={key}>
				<ButtonAcceptDecline
					additionalAcceptOnClick={() => props.answerInviteCallback(true, invite.id)}
					additionalDeclineOnClick={() => props.answerInviteCallback(false, invite.id)}
					size={ButtonSize.Standard}
					type={ButtonType.Standard}
					shape={ButtonShape.Circle}
					label={key}
				></ButtonAcceptDecline>
			</li>
		);
	};

	const renderInvites = (invites: IInvite[]) => invites.map(i => renderInvite(i));

	console.log("INVITES FILTERED: ", invites);
	return (
		<ul className={listCssClass}>
			{renderInvites(invites)}
		</ul>
	);
};

export default InvitesList;
