import * as React from "react";
import { CSSProperties } from "react";
import ReactMapboxGl, { Popup, Marker } from "react-mapbox-gl";
import { IInvite } from "../groups/interfaces/IInvite";
import { colorList } from "../../scss/colorList";
import produce from "immer";
import { FitBoundsOptions } from "react-mapbox-gl/lib/map";
import { getDefaultBounds, mapboxKey, mapboxStyle, onGetName } from "./MapBoxHelper";
import { compareArrays, parseCoords } from "../../helpers/UniversalHelper";

const Mapbox = ReactMapboxGl({
	minZoom: 2,
	maxZoom: 15,
	accessToken: mapboxKey,
});

export interface IMapState {
	fitBounds?: [[number, number], [number, number]];
	center?: [number, number];
	zoom?: [number];
	invites: IInvite[];
	inviteAddress: string;
}

const flyToOptions = {
	speed: 0.8
};

const defaults = {
	zoom: undefined as [number],
	center: undefined as [number, number],
	inviteAddress: undefined as string,
	fitBounds: getDefaultBounds(),
};
export interface IMapProps {
	onStyleLoad?: (map: any) => any;
	getInvitesCallback: () => IInvite[];
	setSelectedInviteCallback: (invite: IInvite) => void;
	invite?: IInvite;
}
export default class MapBoxGroups extends React.Component<IMapProps, IMapState> {

	private currentInviteId: string;

	constructor(props: IMapProps) {
		super(props);
		this.state = {
			invites: this.props.getInvitesCallback(),
			...defaults,
		};
		this.currentInviteId = undefined;
	}

	componentDidMount() {
		const invites: IInvite[] = this.props.getInvitesCallback();
		if (invites && compareArrays(this.state.invites, invites) === false) {
			this.getBounds(invites);
			this.setState(
				produce((draft: IMapState) => {
					draft.invites = invites;
				})
			);
		}
	}

	componentDidUpdate() {
		const invites: IInvite[] = this.props.getInvitesCallback();
		if (invites && compareArrays(this.state.invites, invites) === false) {
			this.getBounds(invites);
			this.setState(produce((draft: IMapState) => {
				draft.invites = invites;
			}));
		}

		if (this.props.invite?.groupInviteId !== this.currentInviteId) {
			this.currentInviteId = this.props.invite?.groupInviteId;
			if (this.props.invite) {
				this.setState(
					produce((draft: IMapState) => {
						draft.center = parseCoords(this.props.invite.groupDto.location);
						draft.zoom = [14];
					})
				);
				onGetName(parseCoords(this.props.invite.groupDto.location)).then(res => {
					this.setState(
						produce((draft: IMapState) => {
							draft.inviteAddress = res;
						})
					);
				});
			} else if (this.state.invites) {
				this.getBounds(invites);
			}
		}

	}

	private getBounds = (invites: IInvite[]) => {
		const allCoords = [
			invites.map((g) => g.groupDto.location.longitude),
			invites.map((g) => g.groupDto.location.latitude),
		];
		let bbox: [[number, number], [number, number]] = getDefaultBounds();

		if (allCoords[0].length !== 0 && allCoords[1].length !== 0) {
			bbox[0][0] = Math.min.apply(null, allCoords[0]);
			bbox[1][0] = Math.max.apply(null, allCoords[0]);
			bbox[0][1] = Math.min.apply(null, allCoords[1]);
			bbox[1][1] = Math.max.apply(null, allCoords[1]);
		}
		if (this.state.fitBounds !== bbox) {
			this.setState(
				produce((draft: IMapState) => {
					draft.fitBounds = bbox;
				})
			);
		}
	}

	private onDrag = () => {
		if (this.props.invite) {
			this.props.setSelectedInviteCallback(undefined);
		}
	}

	private onStyleLoad = (map: any) => {
		const onStyleLoad = this.props.onStyleLoad;
		return onStyleLoad && onStyleLoad(map);
	}

	private markerClick = (invite: IInvite) => {
		this.setState({
			center: parseCoords(invite.groupDto.location),
			zoom: [14],
		});
		this.props.setSelectedInviteCallback(invite);
	}

	public render() {
		const { fitBounds, center, zoom, invites, inviteAddress } = this.state;
		const { invite } = this.props;

		const containerStyle: CSSProperties = {
			height: "100%",
		};

		const boundsOptions: FitBoundsOptions = {
			padding: 100
		};

		const addressStyle: CSSProperties = {
			background: "white",
			color: "gray",
			fontWeight: 400,
			border: "2px",
		};
		const nameStyle: CSSProperties = {
			background: "white",
			color: "gray",
			fontWeight: 600,
			border: "2px",
			fontSize: "17px"
		};

		let colorIndex = 0;

		return (
			<Mapbox
				style={mapboxStyle}
				onStyleLoad={this.onStyleLoad}
				fitBounds={fitBounds}
				fitBoundsOptions={boundsOptions}
				center={center}
				zoom={zoom}
				onDrag={this.onDrag}
				containerStyle={containerStyle}
				flyToOptions={flyToOptions}
			>
				<>
					{invites.map((g) => {
						++colorIndex;
						const color = colorList[colorIndex % colorList.length];

						const markerStyle: CSSProperties = {
							fontSize: "40px",
							color: color
						};

						return (
							<Marker
								key={g.groupInviteId}
								coordinates={parseCoords(g.groupDto.location)}
								anchor="bottom"
								onClick={this.markerClick.bind(this, g)}
							>
								<i className={"fa fa-map-marker"} style={markerStyle}></i>
							</Marker>
						);
					})}

					{invite && (
						<Popup key={invite.groupInviteId} coordinates={parseCoords(invite.groupDto.location)}>
							<div style={nameStyle}>{invite.groupDto.name}</div>
							<div style={addressStyle}>Od: {invite.invitingUser.firstName + " " + invite.invitingUser.lastName}</div>
							<div style={addressStyle}>{inviteAddress}</div>
						</Popup>
					)}
				</>
			</Mapbox>
		);
	}
}
