import * as React from "react";
import { CSSProperties } from "react";
import ReactMapboxGl, { Popup } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import produce from "immer";
import { parseCoords } from "../../helpers/UniversalHelper";
import { ILocation } from "../groups/interfaces/ILocation";
import { getDefaultBounds, getDefaultCenter, mapboxKey, mapboxStyle } from "./MapBoxHelper";
import { FitBoundsOptions } from "mapbox-gl";

const Mapbox = ReactMapboxGl({
	minZoom: 8,
	maxZoom: 15,
	accessToken: mapboxKey,
});

export interface IMapState {
	center?: [number, number];
	zoom?: [number];
	showPopup: boolean
}

const flyToOptions = {
	speed: 3
};

export interface IMapProps {
	onStyleLoad?: (map: any) => any;
	location?: ILocation;
	label?: string;
}

const defaults = {
	zoom: [12] as [number],
	center: getDefaultCenter(),
	showPopup: false
};

export default class MapBoxPicker extends React.Component<IMapProps, IMapState> {

	constructor(props: IMapProps) {
		super(props);
		this.state = {
			...defaults,
		};
	}

	private onStyleLoad = (map: any) => {
		const onStyleLoad = this.props.onStyleLoad;
		return onStyleLoad && onStyleLoad(map);
	}
	componentDidMount() {

	}
	componentDidUpdate() {
		if (this.props.location) {
			if (parseCoords(this.props.location)[0] !== this.state.center[0] || parseCoords(this.props.location)[1] !== this.state.center[1]) {
				this.setState(produce((draft: IMapState) => {
					draft.zoom = [14];
					draft.showPopup = true;
					draft.center = parseCoords(this.props.location);
				}));
			}
		}
	}

	public render() {
		const { center, zoom, showPopup } = this.state;
		const location = this.state.center;
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
				style={mapboxStyle}
				onStyleLoad={this.onStyleLoad}
				center={center}
				zoom={zoom}
				containerStyle={containerStyle}
				flyToOptions={flyToOptions}
			>
				{showPopup &&
					<>
						{location && label &&
							<Popup coordinates={location}>
								<div style={popupStyle}>
									{label}
								</div>
							</Popup>
						}
						{location && !label &&
							<Marker
								coordinates={location}
								anchor="bottom"
							>
								<i className={"fa fa-map-marker"} style={markerStyle}></i>
							</Marker>
						}
					</>
				}
			</Mapbox>
		);
	}
}
