import * as React from "react";
import { CSSProperties } from "react";
import ReactMapboxGl, { Popup, GeoJSONLayer } from "react-mapbox-gl";
import produce from "immer";
import { FitBoundsOptions } from "react-mapbox-gl/lib/map";
import { IRide } from "components/groups/interfaces/IRide";
import { RideDirection } from "../groups/api/addRide/AddRideRequest";
import { parseCoords } from "../../helpers/UniversalHelper";
import { getDefaultBounds, getDirectionsClient, mapboxKey, mapboxStyle, onGetName } from "./MapBoxHelper";
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import { IRideStop } from "../groups/interfaces/IRideStop";
import { ILocation } from "../groups/interfaces/ILocation";
import { sortStops } from "../../helpers/StopsHelper";
import { IRideRequest } from "../groups/interfaces/rideRequest/IRideRequest";
import { IRideRequestUser } from "../groups/interfaces/rideRequest/IRideRequestUser";

const Mapbox = ReactMapboxGl({
	minZoom: 1,
	maxZoom: 20,
	accessToken: mapboxKey,
});

const directionsClient = getDirectionsClient();

export interface IMapState {
	fitBounds?: [[number, number], [number, number]];
	ride: IRide;
	route: any;
	fromName: string;
	toName: string;
	stops: IRideStop[];
	requestingUser: IRideRequestUser;
	requestingLocationName: string;
}

const flyToOptions = {
	speed: 0.8
};

const defaults = {
	route: null,
	fitBounds: getDefaultBounds(),
	fromName: null,
	toName: null,
	stops: [],
	requestingLocationName: "",
};

export interface IMapProps extends IReactI18nProps {
	onStyleLoad?: (map: any) => any;
	ride: IRide;
	requestingUser?: IRideRequestUser;
}

class MapBoxRides extends React.Component<IMapProps, IMapState> {
	constructor(props: IMapProps) {
		super(props);
		this.state = {
			ride: this.props.ride,
			requestingUser: this.props.requestingUser ?? undefined,
			...defaults,
		};
	}

	private resources = {
		toLabel: "mapbox.toLabel",
		fromLabel: "mapbox.fromLabel"
	};

	private onFindRoute = async (ride: IRide) => {
		try {
			if (!ride) {
				this.setState(produce((draft: IMapState) => { draft.route = null; }));
			} else {
				let waypointsSorted = [
					{
						coordinates: parseCoords(ride?.location),
					},
					{
						coordinates: parseCoords(ride?.group?.location)
					},
				];
				if (ride?.stops) {
					const sortedStops = sortStops(this.props.ride.location, this.props.ride.group.location, this.props.ride?.stops);
					waypointsSorted = (sortedStops.sortedStops.map(item => ({ coordinates: parseCoords(item) })));
				}

				const response = await directionsClient
					.getDirections({
						profile: "driving",
						waypoints: waypointsSorted,
						overview: "full",
						geometries: "geojson",
					})
					.send();
				if (response.body.code === "Ok") {
					this.setState(produce((draft: any) => {
						draft.route = response.body.routes[0].geometry.coordinates;
					}));
				}
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
		if (this.state.requestingUser !== this.props.requestingUser) {
			if (this.props.requestingUser) {
				this.setState(
					produce((draft: IMapState) => {
						draft.requestingUser = this.props.requestingUser;
					})
				)
				onGetName(parseCoords(this.props.requestingUser.location)).then(res => {
					this.setState(
						produce((draft: IMapState) => {
							draft.requestingLocationName = res;
						})
					);
				});
			}
		}
		if (this.state.ride !== this.props.ride) {
			if (this.props.ride) {
				this.setState(
					produce((draft: IMapState) => {
						draft.stops = [];
					})
				);
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
			if (this.state.stops !== this.props.ride?.stops) {
				if (this.props.ride?.stops) {
					this.props.ride.stops.map((stop, idx) => {
						onGetName(parseCoords(stop.location)).then(res => {
							this.setState(
								produce((draft: IMapState) => {
									const s: IRideStop = {
										name: res,
										location: stop.location,
										participant: stop.participant
									};
									draft.stops.push(s);
								}));
						});
					});
				}
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
		const { fitBounds, ride, route, fromName, toName, stops, requestingUser, requestingLocationName } = this.state;

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
			maxWidth: "300px",
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap"
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

		const { t } = this.props;
		const toLabel: string = t(this.resources.toLabel);
		const fromLabel: string = t(this.resources.fromLabel);

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
								{ride.rideDirection === RideDirection.To ? fromLabel : toLabel}
							</div>
							<div style={addressStyle}>{ride.rideDirection === RideDirection.To ? fromName : toName}</div>
						</Popup>
						<Popup coordinates={parseCoords(ride.location)}>
							<div style={nameStyle}>
								{ride.rideDirection === RideDirection.To ? toLabel : fromLabel}
							</div>
							<div style={addressStyle}>{ride.rideDirection === RideDirection.To ? toName : fromName}</div>
						</Popup>
						{stops &&
							<>
								{ stops.map((stop, idx) => {
									return (
										<Popup key={idx} coordinates={parseCoords(stop.location)}>
											<div style={nameStyle}>
												{stop.participant.firstName} {stop.participant.lastName}
											</div>
											{stop.name &&
												<div style={addressStyle}>
													{stop.name}
												</div>
											}
										</Popup>
									);
								})}
							</>
						}{requestingUser &&
							<>
								<Popup coordinates={parseCoords(requestingUser.location)}>
									<div style={nameStyle}>
										{requestingUser.firstName} {requestingUser.lastName}
									</div>
									<div style={addressStyle}>{requestingLocationName}</div>
								</Popup>
							</>
						}
					</>
				}
			</Mapbox>);
	}
}

export default withTranslation()(MapBoxRides);
