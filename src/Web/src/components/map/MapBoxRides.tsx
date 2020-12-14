import * as React from "react";
import { CSSProperties } from "react";
import ReactMapboxGl, { Layer, Feature, Popup, Marker, GeoJSONLayer } from "react-mapbox-gl";
import mapConfig from "./mapConfig";
import { colorList } from "../../scss/colorList";
import produce from "immer";
import { FitBoundsOptions } from "react-mapbox-gl/lib/map";
import { IRide } from "components/groups/interfaces/IRide";
import mapboxDirections from "@mapbox/mapbox-sdk/services/directions";
import { RideDirection } from "../groups/api/addRide/AddRideRequest";
import { parseCoords } from "../../helpers/UniversalHelper";

const Mapbox = ReactMapboxGl({
	minZoom: 2,
	maxZoom: 15,
	accessToken: mapConfig.mapboxKey
});

const directionsClient = mapboxDirections({ accessToken: mapConfig.mapboxKey });

export interface IMapState {
	fitBounds?: [[number, number], [number, number]];
	ride: IRide;
	route: any;
}

const flyToOptions = {
	speed: 0.8
};

const defaults = {
	route: null
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
	private onFindRoute = async (ride: IRide) => {
		try {
			if (!ride) {
				this.setState(produce((draft: IMapState) => { draft.route = null; }));
			}
			const response = await directionsClient
				.getDirections({
					profile: "driving-traffic",
					waypoints: [
						{
							coordinates: parseCoords(ride.location),
						},
						{
							coordinates: parseCoords(ride.group?.location)
						},
					],
					overview: "full",
					geometries: "geojson",
				})
				.send();
			if (response.body.code === "Ok") {
				this.setState(produce((draft: any) => {
					draft.route = response.body.routes[0].geometry.coordinates;
				}));
			}
		} catch (err) {
			console.log(err);
		} finally {
		}
	}
	componentDidMount() {
		if (this.props.ride) {
			this.getBounds(this.props.ride);
		}
	}
	componentDidUpdate() {
		if (this.state.ride !== this.props.ride) {
			if (this.props.ride) {
				this.getBounds(this.props.ride);
			}
			this.onFindRoute(this.props.ride);
			this.setState(produce((draft: IMapState) => {
				draft.ride = this.props.ride;
			}));
		}
	}

	private getBounds = (ride: IRide) => {
		const allCoords = [[ride.location?.longitude, ride.group?.location.longitude], [ride.group?.location.latitude, ride.location?.latitude]];
		let bbox: [[number, number], [number, number]] = [[16.89, 52.41], [16.89, 52.41]];
		if (allCoords[0][0] && allCoords[1][1] && allCoords[0][1] && allCoords[1][0]) {
			bbox[0][0] = Math.min.apply(null, allCoords[0]);
			bbox[0][1] = Math.min.apply(null, allCoords[1]);
			bbox[1][0] = Math.max.apply(null, allCoords[0]);
			bbox[1][1] = Math.max.apply(null, allCoords[1]);
		}
		this.setState(produce((draft: any) => {
			draft.fitBounds = bbox;
		}));
	}

	private onStyleLoad = (map: any) => {
		const onStyleLoad = this.props.onStyleLoad;
		return onStyleLoad && onStyleLoad(map);
	}

	public render() {
		const { fitBounds, ride, route } = this.state;

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
		const lineLayout = {
			"line-cap": "round",
			"line-join": "round"
		};
		const linePaint = {
			"line-color": "#6b98d1",
			"line-width": 10
		};
		const geojson = {
			"type": "FeatureCollection",
			"features": [
				{
					"type": "Feature",
					"geometry": {
						"type": "LineString",
						"coordinates": route
					}
				}
			]
		};

		return (
			<Mapbox
				style={mapConfig.mapLight}
				onStyleLoad={this.onStyleLoad}
				fitBounds={fitBounds}
				fitBoundsOptions={boundsOptions}
				containerStyle={containerStyle}
				flyToOptions={flyToOptions}
			>
				{route !== null &&
					<GeoJSONLayer
						data={geojson}
						linePaint={linePaint}
						lineLayout={lineLayout}
					/>
				}
				{ride !== null &&
					<>
						<Popup coordinates={parseCoords(ride.group?.location)}>
							<div style={popupStyle}>
								{`Lokalizacja ${ride.rideDirection === RideDirection.To ? "początkowa" : "końcowa"}`}
							</div>
						</Popup>
						<Popup coordinates={parseCoords(ride.location)}>
							<div style={popupStyle}>
								{`Lokalizacja ${ride.rideDirection === RideDirection.To ? "końcowa" : "początkowa"}`}
							</div>
						</Popup>
					</>
				}
			</Mapbox>);
	}
}
