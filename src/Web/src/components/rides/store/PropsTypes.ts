import { IAnswerRideRequestAction, IGetRideRequestsAction, IRidesSetLoadingStatusAction } from "./Types";
import { IRidesState } from "./State";
import { IAuthState } from "../../auth/store/State";
import { IRideRequest } from "../../groups/interfaces/rideRequest/IRideRequest";
import { answerRideRequest, getRideRequests, setLoadingStatus } from "./Actions";
import { ISetLoaderVisibleAction } from "../../layout/store/Types";
import { setLoaderVisible } from "../../layout/store/Actions";
import { LoadingStatus } from "../../shared/enum/LoadingStatus";

interface IStatePropsType {
	rides: IRidesState;
	auth: IAuthState;
}

interface IStateFromProps {
	requestsOwner: IRideRequest[];
	requestsParticipant: IRideRequest[];
	loadingStatus: LoadingStatus;
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	requestsOwner: state.rides.requestsOwner,
	requestsParticipant: state.rides.requestsParticipant,
	authId: state.auth.tokenInfo?.payload?.sub,
	loadingStatus: state.rides.loadingStatus,
});

interface IDispatchPropsType {
	getRideRequests: () => IGetRideRequestsAction;
	answerRideRequest: (id: string, isAccepted: boolean, owned: boolean) => IAnswerRideRequestAction;
	setLoaderVisible: (visible: boolean) => ISetLoaderVisibleAction;
	setLoadingStatus: (status: LoadingStatus) => IRidesSetLoadingStatusAction;
}

export const mapDispatchToProps: IDispatchPropsType = {
	getRideRequests,
	answerRideRequest,
	setLoaderVisible,
	setLoadingStatus,
};

export type DispatchProps = typeof mapDispatchToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;
