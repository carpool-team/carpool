import * as React from "react";
import {CSSProperties} from "react";
import ReactMapboxGl, { Popup, Marker } from "react-mapbox-gl";
import { IInvite } from "../groups/interfaces/IInvite";
import mapConfig from "./mapConfig";
import { colorList } from "../../scss/colorList";
import produce from "immer";
import { FitBoundsOptions } from "react-mapbox-gl/lib/map";

const Mapbox = ReactMapboxGl({
	minZoom: 2,
	maxZoom: 15,
	accessToken: mapConfig.mapboxKey
});

export interface IMapState {
	fitBounds?: [[number, number], [number, number]];
	center?: [number, number];
	zoom?: [number];
	invite?: IInvite;
	invites: IInvite[];
}

const flyToOptions = {
	speed: 0.8
};

export interface IMapProps {
	onStyleLoad?: (map: any) => any;
	getInvitesCallback: () => IInvite[];
}

export default class MapBoxGroups extends React.Component<IMapProps, IMapState> {

	constructor(props: IMapProps) {
		super(props);
		this.state = {
			fitBounds: undefined,
			invites: this.props.getInvitesCallback(),
			zoom: [11],
			center: [-0.109970527, 51.52916347],
			invite: undefined,
		};
	}

	componentDidUpdate() {
		if (this.state.invites !== this.props.getInvitesCallback()) {
			this.setState(produce((draft: IMapState) => {
				draft.invites = this.props.getInvitesCallback();
				draft.fitBounds = this.getBounds(this.props.getInvitesCallback());
			}));
		}
	}

	private getBounds = (invites: IInvite[]) => {
		// const allCoords = [invites.map(g => g.location.latitude), invites.map(g => g.location.longitude)];
		const allCoords = [[0], [0]];
		let bbox: [[number, number], [number, number]] = [[0, 0], [0, 0]];

		if (allCoords[0].length !== 0 && allCoords[1].length !== 0) {
			bbox[0][1] = Math.min.apply(null, allCoords[0]);
			bbox[1][0] = Math.max.apply(null, allCoords[0]);
			bbox[0][1] = Math.min.apply(null, allCoords[1]);
			bbox[1][1] = Math.max.apply(null, allCoords[1]);
		}

		return bbox;
	}

	private onDrag = () => {
		if (this.state.invite) {
			this.setState({ invite: undefined });
		}
	}

	private onStyleLoad = (map: any) => {
		const onStyleLoad  = this.props.onStyleLoad;
		return onStyleLoad && onStyleLoad(map);
	}

	private markerClick = (invite: IInvite) => {
		this.setState({
			// center: [invite.location.latitude, invite.location.longitude],
			center: [0, 0],
			zoom: [14],
			invite
		});
	}

	public render() {
		const { fitBounds, center, zoom, invites, invite } = this.state;

		const containerStyle: CSSProperties = {
			height: "100%",
		};

		const boundsOptions: FitBoundsOptions = {
			padding: 100
		};

		const popupStyle: CSSProperties = {
			background: "white",
			color: "gray",
			fontWeight: 400,
			border: "2px"
		};

		let colorIndex = 0;

		return (
		<Mapbox
				style={mapConfig.mapLight}
				onStyleLoad={this.onStyleLoad}
				fitBounds={fitBounds}
				fitBoundsOptions = {boundsOptions}
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
						key={g.id}
						// coordinates={[g.location.latitude, g.location.longitude]}
						coordinates={[0, 0]}
						anchor="bottom"
						onClick={this.markerClick.bind(this, g)}
						>
						<i className={"fa fa-map-marker"} style={markerStyle}></i>
					</Marker>
				);
			})}

			{invite && (
				// <Popup key={invite.id} coordinates={[invite.location.latitude, invite.location.longitude]}>
				<Popup key={invite.id} coordinates={[0, 0]}>
					<div style={popupStyle}>
					{invite.groupId}
					</div>
					<div style={popupStyle}>
					Od: {invite.invitingUserId}
					</div>
				</Popup>
			)}
			</>
		</Mapbox>
		);
	}
}
