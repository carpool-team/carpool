import * as React from "react";
import { CSSProperties } from "react";
import ReactMapboxGl, { Popup, Marker } from "react-mapbox-gl";
import { IGroup } from "../groups/interfaces/IGroup";
import { colorList } from "../../scss/colorList";
import produce from "immer";
import { FitBoundsOptions } from "react-mapbox-gl/lib/map";
import { parseCoords } from "../../helpers/UniversalHelper";
import { getDefaultBounds, getGeocodingClient, mapboxKey, mapboxStyle, onGetName } from "./MapBoxHelper";

const Mapbox = ReactMapboxGl({
	minZoom: 1,
	maxZoom: 15,
	accessToken: mapboxKey,
});
export interface IMapState {
	fitBounds?: [[number, number], [number, number]];
	center?: [number, number];
	zoom?: [number];
	groups: IGroup[];
	groupAddress: string;
}

const flyToOptions = {
	speed: 0.8,
};

const defaults = {
	zoom: undefined as [number],
	center: undefined as [number, number],
	groupAddress: undefined as string,
	fitBounds: getDefaultBounds(),
};

export interface IMapProps {
	onStyleLoad?: (map: any) => any;
	getGroupsCallback: () => IGroup[];
	setSelectedGroupCallback: (id: string) => void;
	group?: IGroup;
}

export default class MapBoxGroups extends React.Component<
	IMapProps,
	IMapState
	> {
	private currentGroupId: string;

	constructor(props: IMapProps) {
		super(props);
		this.state = {
			groups: this.props.getGroupsCallback(),
			...defaults,
		};
		this.currentGroupId = undefined;
	}

	componentDidMount() {
		const groups: IGroup[] = this.props.getGroupsCallback();
		if (groups && this.state.groups !== groups) {
			this.getBounds(groups);
			this.setState(
				produce((draft: IMapState) => {
					draft.groups = groups;
				})
			);
		}
	}

	componentDidUpdate() {
		const groups: IGroup[] = this.props.getGroupsCallback();
		if (groups && this.state.groups !== groups) {
			this.getBounds(groups);
			this.setState(
				produce((draft: IMapState) => {
					draft.groups = groups;
				})
			);
		}

		if (this.props.group?.groupId !== this.currentGroupId) {
			this.currentGroupId = this.props.group?.groupId;
			if (this.props.group) {
				this.setState(
					produce((draft: IMapState) => {
						draft.center = parseCoords(this.props.group.location);
						draft.zoom = [14];
					})
				);
				onGetName(parseCoords(this.props.group.location)).then(res => {
					this.setState(
						produce((draft: IMapState) => {
							draft.groupAddress = res;
						})
					);
				});
			} else if (this.state.groups?.length) {
				this.getBounds(groups);
			}
		}
	}

	private getBounds = (groups: IGroup[]) => {
		const allCoords = [
			groups.map((g) => g.location.longitude),
			groups.map((g) => g.location.latitude),
		];
		let bbox: [[number, number], [number, number]] = getDefaultBounds();

		if (allCoords[0].length !== 0 && allCoords[1].length !== 0) {
			bbox[0][0] = Math.min.apply(null, allCoords[0]);
			bbox[1][0] = Math.max.apply(null, allCoords[0]);
			bbox[0][1] = Math.min.apply(null, allCoords[1]);
			bbox[1][1] = Math.max.apply(null, allCoords[1]);
		}
		if (this.state.fitBounds !== bbox) {
			this.setState(
				produce((draft: IMapState) => {
					draft.fitBounds = bbox;
				})
			);
		}
	}

	private onDrag = () => {
		if (this.props.group) {
			this.props.setSelectedGroupCallback(undefined);
		}
	}

	private onStyleLoad = (map: any) => {
		const onStyleLoad = this.props.onStyleLoad;
		return onStyleLoad && onStyleLoad(map);
	}

	private markerClick = (group: IGroup) => {
		this.setState({
			center: parseCoords(group.location),
			zoom: [14],
		});

		this.props.setSelectedGroupCallback(group.groupId);
	}

	public render() {
		const { fitBounds, center, zoom, groups, groupAddress } = this.state;
		const { group } = this.props;

		const containerStyle: CSSProperties = {
			height: "100%",
		};

		const boundsOptions: FitBoundsOptions = {
			padding: 100,
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

		let colorIndex = 0;

		return (
			<Mapbox
				style={mapboxStyle}
				onStyleLoad={this.onStyleLoad}
				fitBounds={fitBounds}
				fitBoundsOptions={boundsOptions}
				center={center}
				zoom={zoom}
				onDrag={this.onDrag}
				containerStyle={containerStyle}
				flyToOptions={flyToOptions}
			>
				<>
					{groups.map((g) => {
						++colorIndex;
						const color = colorList[colorIndex % colorList.length];

						const markerStyle: CSSProperties = {
							fontSize: "40px",
							color: color,
						};

						return (
							<Marker
								key={g.groupId}
								coordinates={parseCoords(g.location)}
								anchor="bottom"
								onClick={this.markerClick.bind(this, g)}
							>
								<i className={"fa fa-map-marker"} style={markerStyle}></i>
							</Marker>
						);
					})}

					{group && (
						<Popup
							key={group.groupId}
							coordinates={parseCoords(group.location)}
						>
							<div style={nameStyle}>{group.name}</div>
							<div style={addressStyle}>{groupAddress}</div>
						</Popup>
					)}
				</>
			</Mapbox>
		);
	}
}
