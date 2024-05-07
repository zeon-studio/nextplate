"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Tooltip,
} from "react-leaflet";
import { LatLngExpression, LatLngTuple, latLngBounds } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  center: LatLngExpression | LatLngTuple;
  zoom?: number;
  position1: LatLngExpression | LatLngTuple;
  position2: LatLngExpression | LatLngTuple;
}

const defaults = {
  zoom: 4.5,
};

const Map = (Map: MapProps) => {
  const { zoom = defaults.zoom, center, position1, position2 } = Map;
  const bounds = latLngBounds(position1, position2);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      bounds={bounds}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position1} draggable={false}>
        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
          <p className="font-semibold pb-1">Ninth Avenue Foods</p>
          <p>425 S 9th Ave, City of Industry, CA</p>
          <p>91746, USA</p>
        </Tooltip>
      </Marker>

      <Marker position={position2} draggable={false}>
        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
          <p className="font-semibold pb-1">Ninth Avenue Foods East</p>
          <p>6350 S 175 W, Columbus, IN</p>
          <p>47201, USA</p>
        </Tooltip>
      </Marker>
    </MapContainer>
  );
};

export default Map;
