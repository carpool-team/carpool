import * as React from "react";
import {CSSProperties} from "react";
import ReactMapboxGl, { Layer, Feature, Popup, Marker } from "react-mapbox-gl";
import { IGroup } from "../groups/interfaces/IGroup";
import mapConfig from "./mapConfig";
import { colorList } from "../../scss/colorList";
import produce from "immer";
import { FitBoundsOptions } from "react-mapbox-gl/lib/map";

const Mapbox = ReactMapboxGl({
	// TODO jak bedą grupy z lokacją to zmienić na prawidłowy -> około 8
	minZoom: 2,
	maxZoom: 15,
	accessToken: mapConfig.mapboxKey
});

export interface IMapState {
	fitBounds?: [[number, number], [number, number]];
	center?: [number, number];
	zoom?: [number];
	group?: IGroup;
	groups: IGroup[];
}

const flyToOptions = {
	speed: 0.8
};

export interface IMapProps {
	onStyleLoad?: (map: any) => any;
	getGroupsCallback: () => IGroup[];
	group?: IGroup;
}

export default class MapBoxGroups extends React.Component<IMapProps, IMapState> {

	constructor(props: IMapProps) {
		super(props);
		this.state = {
			fitBounds: undefined,
			groups: this.props.getGroupsCallback(),
			zoom: [11],
			center: [-0.109970527, 51.52916347],
			group: undefined,
		};
	}

	componentDidUpdate() {
		if (this.state.groups !== this.props.getGroupsCallback()) {
			this.setState(produce((draft: IMapState) => {
				draft.groups = this.props.getGroupsCallback();
				draft.fitBounds = this.getBounds(this.props.getGroupsCallback());
			}));

		if (this.state.group !== this.props.group) {
			this.setState(produce((draft: IMapState) => {
				if (this.props.group !== undefined) {
					draft.group = this.props.group;
					draft.center = [this.props.group.location.latitude, this.props.group.location.longitude];
					draft.zoom = [14];
				} else {
					draft.group = undefined;
					draft.fitBounds = this.getBounds(this.props.getGroupsCallback());
				}
				}));
			}
		}
	}

	private getBounds = (groups: IGroup[]) => {
		const allCoords = [groups.map(g => g.location.latitude), groups.map(g => g.location.longitude)];
		let bbox: [[number, number], [number, number]] = [[0, 0], [0, 0]];

		if (allCoords[0].length !== 0 && allCoords[1].length !== 0) {
			bbox[0][1] = Math.min.apply(null, allCoords[0]);
			bbox[1][0] = Math.max.apply(null, allCoords[0]);
			bbox[0][1] = Math.min.apply(null, allCoords[1]);
			bbox[1][1] = Math.max.apply(null, allCoords[1]);
		}

		return bbox;
	}

	private onDrag = () => {
		if (this.state.group) {
			this.setState({ group: undefined });
		}
	}

	private onStyleLoad = (map: any) => {
		const onStyleLoad  = this.props.onStyleLoad;
		return onStyleLoad && onStyleLoad(map);
	}

	private markerClick = (group: IGroup) => {
		this.setState({
			center: [group.location.latitude, group.location.longitude],
			zoom: [14],
			group
		});
	}

	public render() {
		const { fitBounds, center, zoom, groups, group } = this.state;

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
			border: "2px"
		};

		let colorIndex = 0;

		return (
		<Mapbox
				style={mapConfig.mapLight}
				onStyleLoad={this.onStyleLoad}
				fitBounds={fitBounds}
				fitBoundsOptions = {boundsOptions}
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
					color: color
				};

				return (
					<Marker
						key={g.id}
						coordinates={[g.location.latitude, g.location.longitude]}
						anchor="bottom"
						onClick={this.markerClick.bind(this, g)}
						>
						<i className={"fa fa-map-marker"} style={markerStyle}></i>
					</Marker>
				);
			})}

			{group && (
				<Popup key={group.id} coordinates={[group.location.latitude, group.location.longitude]}>
					<div style={popupStyle}>
					{group.name}
					</div>
					<div style={popupStyle}>
					Adres:TODO
					</div>
				</Popup>
			)}
			</>
		</Mapbox>
		);
	}
}
