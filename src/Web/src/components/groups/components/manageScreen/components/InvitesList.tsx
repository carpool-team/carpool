import React from "react";
import ButtonAcceptDecline from "../../../../ui/Button/ButtonAcceptDecline";
import { ButtonSize } from "../../../../ui/Button/enums/ButtonSize";
import { ButtonType } from "../../../../ui/Button/enums/ButtonType";
import { ButtonShape } from "../../../../ui/Button/enums/ButtonShape";
import { IInvite } from "../../../interfaces/IInvite";
import { IGroup } from "../../../interfaces/IGroup";

interface IInvitesListProps {
	getInvitesCallback: () => IInvite[];
	getGroupsCallback: () => IGroup[];
	answerInviteCallback: (accepted: boolean, id: string) => void;
}

const InvitesList = (props: IInvitesListProps) => {
	const listCssClass: string = "groupList__list";

	const groups: IGroup[] = props.getGroupsCallback();
	const invites: IInvite[] = props.getInvitesCallback().filter(i => i.isPending);

	const renderInvite = (invite: IInvite) => {
		let key: string = invite.id;
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

	return (
		<ul className={listCssClass}>
			{renderInvites(invites)}
		</ul>
	);
};

export default InvitesList;
