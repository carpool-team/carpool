import React, { CSSProperties } from "react";
import mapConfig from "./mapConfig";
import "./map.scss";
import {IMapPoint} from "./interfaces/IMapPoint";
import ReactMapboxGl, { Layer, Feature, Marker, Source } from "react-mapbox-gl";
import { render } from "react-dom";
import {pin} from "../../assets/svg";

type IMapProps = {
	points?: IMapPoint[]
};

const MapBox = (props: IMapProps) => {

	const Map = ReactMapboxGl({
		accessToken: mapConfig.mapboxKey
	});

	const containerStyle: CSSProperties = {
		height: "100%",
	};

// Define layout to use in Layer component
const layoutLayer = { "icon-image": "londonCycle" };

// Create an image for the Layer
const image = new Image();
image.src = "data:image/svg+xml;charset=utf-8;base64," + btoa(pin);
const images: any = ["londonCycle", image];

// Create an image for the Layer

		return (
			<Map style= {mapConfig.mapLight} containerStyle={containerStyle} center={[16.86633729745128, 52.40656926303501]}>

				<Layer type="circle">
						<Feature key={"fda"} coordinates={[16.86633729745128 , 52.40656926303501]}/>
				</Layer>
				<Marker
					coordinates={[16.86633729745128 , 52.40656926303501]}
					anchor="bottom">
				<i className={"fa fa-map-marker"}></i>
			</Marker>
			</Map>
		);
};

export default MapBox;
