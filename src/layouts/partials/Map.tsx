"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Tooltip,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import {
  LatLngExpression,
  LatLngTuple,
  latLngBounds,
  FitBoundsOptions,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  center: LatLngExpression | LatLngTuple;
  zoom?: number;
  position1: LatLngExpression | LatLngTuple;
  position2: LatLngExpression | LatLngTuple;
}

const Map = ({ center, position1, position2 }: MapProps) => {
  const bounds = latLngBounds(position1, position2);

  const MapComponent = () => {
    const map = useMap();

    useEffect(() => {
      // Function to update map view dynamically based on bounds
      const updateMapView = () => {
        map.fitBounds(bounds, { padding: [50, 50] }); // Adds padding around bounds
      };

      // Update map view when component mounts and bounds change
      updateMapView();

      console.log(window.addEventListener("resize", updateMapView));

      // Proper cleanup to remove the event listener
      return () => {
        window.removeEventListener("resize", updateMapView);
      };
    }, [map]);

    return null;
  };

  return (
    <>
      <MapContainer
        center={center}
        scrollWheelZoom={false}
        bounds={bounds}
        className="h-full w-full rounded-md"
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
        <MapComponent />
      </MapContainer>
    </>
  );
};

export default Map;
