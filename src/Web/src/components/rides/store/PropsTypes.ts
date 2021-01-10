import { IAnswerRideRequestAction, IGetRideRequestsAction } from "./Types";
import { IRidesState } from "./State";
import { IAuthState } from "../../auth/store/State";
import { IRideRequest } from "../../groups/interfaces/IRideRequest";
import { answerRideRequest, getRideRequests } from "./Actions";
import { ISetLoaderVisibleAction } from "../../layout/store/Types";
import { setLoaderVisible } from "../../layout/store/Actions";

interface IStatePropsType {
	rides: IRidesState;
	auth: IAuthState;
}

interface IStateFromProps {
	requestsOwner: IRideRequest[];
	requestsParticipant: IRideRequest[];
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	requestsOwner: state.rides.requestsOwner,
	requestsParticipant: state.rides.requestsParticipant,
	authId: state.auth.tokenInfo?.payload?.sub,
});

interface IDispatchPropsType {
	getRideRequests: () => IGetRideRequestsAction;
	answerRideRequest: (id: string, isAccepted: boolean, owned: boolean) => IAnswerRideRequestAction;
	setLoaderVisible: (visible: boolean) => ISetLoaderVisibleAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	getRideRequests,
	answerRideRequest,
	setLoaderVisible,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;
