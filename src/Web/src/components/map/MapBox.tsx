import React, { CSSProperties, useState } from "react";
import mapConfig from "./mapConfig";
import "./map.scss";
import { IGroup } from "./../groups/interfaces/IGroup";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import { colorList } from "../../scss/colorList";

type IMapProps = {
	groups?: IGroup[]
};

const MapBox = (props: IMapProps) => {

	const Map = ReactMapboxGl({
		accessToken: mapConfig.mapboxKey
	});

	const groups = props.groups;

	const [center, setCenter] = useState([16.86633729745128, 52.40656926303501]);
	const [zoom, setZoom] = useState([11]);
	const [group, setGroup] = useState(undefined);

	const onDrag = () => {
		if (group) {
			setGroup(undefined);
		}
	};
	const onZoom = () => {
		if (group) {
			setGroup(undefined);
		}
	};

	const markerClick = (group: IGroup) => {
		setGroup(group);
		setCenter([group.location.latitude, group.location.longitude]),
			setZoom([14]);
	};

	const flyToOptions = {
		speed: 0.8
	};

	const containerStyle: CSSProperties = {
		height: "100%",
	};

	const popupStyle: CSSProperties = {
		background: "white",
		color: "gray",
		fontWeight: 400,
		border: "2px"
	};

	let colorIndex = 0;

	const renderGroups = () => (
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
						anchor="bottom" onClick={markerClick.bind(this, g)}>
						<i className={"fa fa-map-marker"} style={markerStyle}></i>
					</Marker>
				);
			})}

			{group && (
				<Popup key={group.id} coordinates={[group.location.latitude, group.location.longitude]}>
					<div style={popupStyle}> {group.name}</div>
				</Popup>
			)}
		</>
	);

	return (
		<>
			<Map
				style={mapConfig.mapLight}
				containerStyle={containerStyle}
				center={center as [number, number]}
				onDrag={onDrag}
				onZoom={onZoom}
				zoom={zoom as [number]}
				flyToOptions={flyToOptions}
			>
				{renderGroups()}
			</Map>
		</>
	);
};

export default MapBox;
