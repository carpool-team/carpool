import React from "react";
import { ButtonSize } from "../../../../ui/_oldButton/enums/ButtonSize";
import { ButtonType } from "../../../../ui/_oldButton/enums/ButtonType";
import { ButtonShape } from "../../../../ui/_oldButton/enums/ButtonShape";
import { IRide } from "../../../interfaces/IRide";
import ButtonJoin from "../../../../ui/_oldButton/ButtonJoin";
import { tempUserId } from "../../../../../api/useRequest";

interface IRidesListProps {
	getRidesCallback: () => IRide[];
	participateCallback: (rideId: string) => void;
}

const InvitesList = (props: IRidesListProps) => {
	const listCssClass: string = "groupList__list";

	const rides: IRide[] = props.getRidesCallback();

	const renderRide = (ride: IRide) => {
		let label: string;

		if (ride.destination.locationName.name == null) {
			label = "Brak nazwy lokacji";
		} else {
			label = ride.destination.locationName.name;
		}

		return (
			<li key={ride.id}>
				<ButtonJoin
					size={ButtonSize.Standard}
					type={ButtonType.Standard}
					shape={ButtonShape.Circle}
					owner={ride.owner.userId === tempUserId}
					additionalJoinOnClick={() => props.participateCallback(ride.id)}
					label={label}
				></ButtonJoin>
			</li>
		);
	};

	const renderRides = (rides: IRide[]) => rides.map((i) => renderRide(i));

	return <ul className={listCssClass}>{renderRides(rides)}</ul>;
};

export default InvitesList;
