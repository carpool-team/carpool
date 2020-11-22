import * as React from "react";
import { CSSProperties } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, Marker } from "react-mapbox-gl";
import { IGroup } from "../groups/interfaces/IGroup";
import mapConfig from "./mapConfig";
import { colorList } from "../../scss/colorList";
import produce from "immer";
import { FitBoundsOptions } from "react-mapbox-gl/lib/map";
import { IRide } from "components/groups/interfaces/IRide";

const Mapbox = ReactMapboxGl({
	// TODO jak bedą grupy z lokacją to zmienić na prawidłowy -> około 8
	minZoom: 8,
	maxZoom: 15,
	accessToken: mapConfig.mapboxKey
});

export interface IMapState {
	fitBounds?: [[number, number], [number, number]];
	center?: [number, number];
	zoom?: [number];
	ride: IRide;
}

const flyToOptions = {
	speed: 0.8
};

const defaults = {
	zoom: [11] as [number],
	center: [-0.109970527, 51.52916347] as [number, number],
};

export interface IMapProps {
	onStyleLoad?: (map: any) => any;
	ride: IRide;
}

export default class MapBoxGroups extends React.Component<IMapProps, IMapState> {

	constructor(props: IMapProps) {
		super(props);
		this.state = {
			fitBounds: undefined,
			ride: this.props.ride,
			...defaults,
		};
	}

	componentDidUpdate() {
		if (this.state.ride !== this.props.ride) {
			this.setState(produce((draft: IMapState) => {
				draft.ride = this.props.ride;
				// TODO  Obliczać prawidłowo zoom
				draft.zoom = [12];
				draft.fitBounds = this.getBounds(this.props.ride);
				draft.center = this.getCenter(draft.fitBounds);
			}));
		}
	}

	private getBounds = (ride: IRide) => {
		const allCoords = [[ride.destination.latitude, ride.startingLocation.latitude], [ride.destination.longitude, ride.startingLocation.longitude]];
		console.log(allCoords);
		let bbox: [[number, number], [number, number]] = [[0, 0], [0, 0]];

		if (allCoords[0].length !== 0 && allCoords[1].length !== 0) {
			bbox[0][0] = Math.min.apply(null, allCoords[0]);
			bbox[1][0] = Math.max.apply(null, allCoords[0]);
			bbox[0][1] = Math.min.apply(null, allCoords[1]);
			bbox[1][1] = Math.max.apply(null, allCoords[1]);
		}
		console.log(bbox);

		return bbox;
	}
	private getCenter = (bbox: [[number, number], [number, number]]) => {
		let cords: [number, number] = [0, 0];
		cords[0] = (bbox[0][0] + bbox[1][0]) / 2;
		cords[1] = (bbox[0][1] + bbox[1][1]) / 2;
		return cords;
	}

	private onStyleLoad = (map: any) => {
		const onStyleLoad = this.props.onStyleLoad;
		return onStyleLoad && onStyleLoad(map);
	}

	public render() {
		const { fitBounds, center, zoom, ride } = this.state;

		const containerStyle: CSSProperties = {
			height: "100%",
		};

		const boundsOptions: FitBoundsOptions = {
			padding: 20
		};

		const popupStyle: CSSProperties = {
			background: "white",
			color: "gray",
			fontWeight: 400,
			border: "2px",
		};
		const fromMarkerStyle: CSSProperties = {
			fontSize: "40px",
			color: "#10ac84"
		};
		const toMarkerStyle: CSSProperties = {
			fontSize: "40px",
			color: "#ee5253"
		};

		return (
			<Mapbox
				style={mapConfig.mapLight}
				onStyleLoad={this.onStyleLoad}
				fitBounds={fitBounds}
				fitBoundsOptions={boundsOptions}
				center={center}
				zoom={zoom}
				containerStyle={containerStyle}
				flyToOptions={flyToOptions}
			>
				{ride !== null &&
				<>
				<Marker
					style= {toMarkerStyle}
					coordinates={[ride.destination.latitude, ride.destination.longitude]}
					anchor="bottom"
					>
					<i className={"fa fa-map-marker"}></i>
				</Marker>
				<Marker
					style= {fromMarkerStyle}
					coordinates={[ride.startingLocation.latitude, ride.startingLocation.longitude]}
					anchor="bottom"
					>
					<i className={"fa fa-map-marker"}></i>
				</Marker>
				<Popup coordinates={[ride.destination.latitude, ride.destination.longitude]}>
					<div style={popupStyle}>
						{"Lokalizacja końcowa."}
					</div>
				</Popup>
				<Popup coordinates={[ride.startingLocation.latitude, ride.startingLocation.longitude]}>
					<div style={popupStyle}>
						{"Lokalizacja startowa."}
					</div>
				</Popup>
				</>
				}
			</Mapbox>
		);
	}
}
