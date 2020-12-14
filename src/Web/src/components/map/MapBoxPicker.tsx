import * as React from "react";
import { CSSProperties } from "react";
import ReactMapboxGl, { Popup } from "react-mapbox-gl";
import mapConfig from "./mapConfig";
import { Marker } from "react-mapbox-gl";
import produce from "immer";
import { parseCoords } from "../../helpers/UniversalHelper";
import { ILocation } from "../groups/interfaces/ILocation";

const Mapbox = ReactMapboxGl({
	minZoom: 8,
	maxZoom: 15,
	accessToken: mapConfig.mapboxKey
});

export interface IMapState {
	center?: ILocation;
	zoom?: [number];
}

const flyToOptions = {
	speed: 1
};

export interface IMapProps {
	onStyleLoad?: (map: any) => any;
	location?: ILocation;
	label?: string;
}

export default class MapBoxPicker extends React.Component<IMapProps, IMapState> {

	constructor(props: IMapProps) {
		super(props);
		this.state = {
			zoom: [11],
			center: {
				latitude: 52.408141,
				longitude: 16.926712,
			}
		};
	}

	private onStyleLoad = (map: any) => {
		const onStyleLoad = this.props.onStyleLoad;
		return onStyleLoad && onStyleLoad(map);
	}
	componentDidUpdate() {
		if (this.props.location) {
			if (this.props.location !== this.state.center) {
				this.setState(produce((draft: IMapState) => {
					draft.zoom = [14];
					draft.center = this.props.location;
				}));
			}
		}
	}

	public render() {
		const { center, zoom } = this.state;
		const location = this.props.location;
		const label = this.props.label;

		const containerStyle: CSSProperties = {
			height: "100%",
		};

		const markerStyle: CSSProperties = {
			fontSize: "50px",
			color: "#6b98d1"
		};

		const popupStyle: CSSProperties = {
			background: "white",
			color: "gray",
			fontWeight: 400,
			border: "2px",
		};


		return (
			<Mapbox
				style={mapConfig.mapLight}
				onStyleLoad={this.onStyleLoad}
				center={parseCoords(center)}
				zoom={zoom}
				containerStyle={containerStyle}
				flyToOptions={flyToOptions}
			>
				{location && label &&
					<Popup coordinates={parseCoords(location)}>
						<div style={popupStyle}>
							{label}
						</div>
					</Popup>
				}
				{location && !label &&
					<Marker
						coordinates={parseCoords(location)}
						anchor="bottom"
					>
						<i className={"fa fa-map-marker"} style={markerStyle}></i>
					</Marker>
				}
			</Mapbox>
		);
	}
}
