import * as React from "react";
import {CSSProperties} from "react";
import ReactMapboxGl from "react-mapbox-gl";
import mapConfig from "./mapConfig";

const Mapbox = ReactMapboxGl({
	minZoom: 2,
	maxZoom: 15,
	accessToken: mapConfig.mapboxKey
});

export interface IMapState {
	center?: [number, number];
	zoom?: [number];
}

export interface IMapProps {
	onStyleLoad?: (map: any) => any;
}

export default class MapBoxPicker extends React.Component<IMapProps, IMapState> {

	constructor(props: IMapProps) {
		super(props);
		this.state = {
			zoom: [11],
			center: [-0.109970527, 51.52916347],
		};
	}

	private onStyleLoad = (map: any) => {
		const onStyleLoad  = this.props.onStyleLoad;
		return onStyleLoad && onStyleLoad(map);
	}

	public render() {
		const {center, zoom} = this.state;

		const containerStyle: CSSProperties = {
			height: "100%",
		};

		return (
		<Mapbox
				style={mapConfig.mapLight}
				onStyleLoad={this.onStyleLoad}
				center={center}
				zoom={zoom}
				containerStyle={containerStyle}
				>
		</Mapbox>
		);
	}
}
