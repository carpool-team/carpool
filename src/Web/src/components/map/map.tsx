import React from "react";
import mapboxgl, { Map } from "mapbox-gl";
import mapConfig from "./mapConfig";
import "./map.scss";

type Props = {
  longitude: number;
  latitude: number;
};

mapboxgl.accessToken = mapConfig.mapboxKey;

class MapBox extends React.Component<Props> {
  private mapContainer: HTMLElement | null | undefined = undefined;
  private map: Map | undefined;

  componentDidMount(): void {
    this.map = new mapboxgl.Map({
      container:
        this.mapContainer === undefined || this.mapContainer === null
          ? ""
          : this.mapContainer,
      center: [this.props.latitude, this.props.longitude],
      style: mapConfig.mapLight,
      zoom: 13
    });
  }
  render(): JSX.Element {
    return (
      <div
        ref={(el): void => {
          this.mapContainer = el;
        }}
        className="mapContainer"
      />
    );
  }
}

export default MapBox;
