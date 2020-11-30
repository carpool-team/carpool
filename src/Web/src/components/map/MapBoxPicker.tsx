import * as React from "react";
import {CSSProperties} from "react";
import ReactMapboxGl from "react-mapbox-gl";
import mapConfig from "./mapConfig";
import {  Marker } from "react-mapbox-gl";
import produce from "immer";

const Mapbox = ReactMapboxGl({
	minZoom: 8,
	maxZoom: 15,
	accessToken: mapConfig.mapboxKey
});

export interface IMapState {
	center?: [number, number];
	zoom?: [number];
}

const flyToOptions = {
	speed: 1
};

export interface IMapProps {
	onStyleLoad?: (map: any) => any;
	location?: [number, number];
}

export default class MapBoxPicker extends React.Component<IMapProps, IMapState> {

	constructor(props: IMapProps) {
		super(props);
		this.state = {
			zoom: [11],
			center: [16.926712, 52.408141]
		};
	}

	private onStyleLoad = (map: any) => {
		const onStyleLoad  = this.props.onStyleLoad;
		return onStyleLoad && onStyleLoad(map);
	}
	componentDidUpdate() {
		if (this.props.location !== this.state.center) {
			this.setState(produce((draft: IMapState) => {
				draft.zoom = [14];
				draft.center = this.props.location;
			}));
		}
	}

	public render() {
		const {center, zoom} = this.state;
		const location = this.props.location;

		const containerStyle: CSSProperties = {
			height: "100%",
		};
		const markerStyle: CSSProperties = {
			fontSize: "50px",
			color: "#6b98d1"
		};

		return (
		<Mapbox
				style={mapConfig.mapLight}
				onStyleLoad={this.onStyleLoad}
				center={center}
				zoom={zoom}
				containerStyle={containerStyle}
				flyToOptions={flyToOptions}
				>
					{location &&
						<Marker
							coordinates={[location[0], location[1]]}
							anchor="bottom"
						>
							<i className={"fa fa-map-marker"} style={markerStyle}></i>
						</Marker>
					}
		</Mapbox>
		);
	}
}
