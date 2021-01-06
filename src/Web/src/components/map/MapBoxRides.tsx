import * as React from "react";
import { CSSProperties } from "react";
import ReactMapboxGl, { Popup, GeoJSONLayer } from "react-mapbox-gl";
import produce from "immer";
import { FitBoundsOptions } from "react-mapbox-gl/lib/map";
import { IRide } from "components/groups/interfaces/IRide";
import { RideDirection } from "../groups/api/addRide/AddRideRequest";
import { parseCoords } from "../../helpers/UniversalHelper";
import { getDefaultBounds, getDirectionsClient, mapboxKey, mapboxStyle, onGetName } from "./MapBoxHelper";

const Mapbox = ReactMapboxGl({
	minZoom: 2,
	maxZoom: 15,
	accessToken: mapboxKey,
});

const directionsClient = getDirectionsClient();

export interface IMapState {
	fitBounds?: [[number, number], [number, number]];
	ride: IRide;
	route: any;
	fromName: string;
	toName: string;
}

const flyToOptions = {
	speed: 0.8
};

const defaults = {
	route: null,
	fitBounds: getDefaultBounds(),
	fromName: null,
	toName: null,
};

export interface IMapProps {
	onStyleLoad?: (map: any) => any;
	ride: IRide;
}

export default class MapBoxGroups extends React.Component<IMapProps, IMapState> {

	constructor(props: IMapProps) {
		super(props);
		this.state = {
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
				onGetName(parseCoords(this.props.ride.location)).then(res => {
					this.setState(
						produce((draft: IMapState) => {
							if (this.props.ride.rideDirection === RideDirection.To) {
								draft.toName = res;
							} else {
								draft.fromName = res;
							}
						})
					);
				});
				onGetName(parseCoords(this.props.ride.group.location)).then(res => {
					this.setState(
						produce((draft: IMapState) => {
							if (this.props.ride.rideDirection === RideDirection.To) {
								draft.fromName = res;
							} else {
								draft.toName = res;
							}
						})
					);
				});
			}
			this.onFindRoute(this.props.ride);
			this.setState(produce((draft: IMapState) => {
				draft.ride = this.props.ride;
			}));
		}
	}

	private getBounds = (ride: IRide) => {
		const allCoords = [[ride.location?.longitude, ride.group?.location.longitude], [ride.group?.location.latitude, ride.location?.latitude]];
		let bbox: [[number, number], [number, number]] = getDefaultBounds();
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
		const { fitBounds, ride, route, fromName, toName } = this.state;

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
				style={mapboxStyle}
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
							<div style={nameStyle}>
								{`Lokalizacja ${ride.rideDirection === RideDirection.To ? "początkowa" : "końcowa"}`}
							</div>
							<div style={addressStyle}>{ride.rideDirection === RideDirection.To ? fromName : toName}</div>
						</Popup>
						<Popup coordinates={parseCoords(ride.location)}>
							<div style={nameStyle}>
								{`Lokalizacja ${ride.rideDirection === RideDirection.To ? "końcowa" : "początkowa"}`}
							</div>
							<div style={addressStyle}>{ride.rideDirection === RideDirection.To ? toName : fromName}</div>
						</Popup>
					</>
				}
			</Mapbox>);
	}
}
