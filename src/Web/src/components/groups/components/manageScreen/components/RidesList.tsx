import React from "react";
import { ButtonSize } from "../../../../ui/Button/enums/ButtonSize";
import { ButtonType } from "../../../../ui/Button/enums/ButtonType";
import { ButtonShape } from "../../../../ui/Button/enums/ButtonShape";
import { IRide } from "../../../interfaces/IRide";
import ButtonJoin from "../../../../ui/Button/ButtonJoin";

interface IRidesListProps {
  getRidesCallback: () => IRide[];
  participateCallback: (rideId: string) => void;
}

const InvitesList = (props: IRidesListProps) => {
  const listCssClass: string = "groupList__list";

  const rides: IRide[] = props.getRidesCallback();

  const renderRide = (ride: IRide) => {
    let key: string = ride.id;
    console.log(ride);
    return (
      <li key={key}>
        <ButtonJoin
          size={ButtonSize.Standard}
          type={ButtonType.Standard}
          shape={ButtonShape.Circle}
          owner={ride.isUserParticipant}
          additionalJoinOnClick={() => props.participateCallback(ride.id)}
          label={ride.destination.locationName.name}
        ></ButtonJoin>
      </li>
    );
  };

  const renderRides = (rides: IRide[]) => rides.map((i) => renderRide(i));

  return <ul className={listCssClass}>{renderRides(rides)}</ul>;
};

export default InvitesList;
