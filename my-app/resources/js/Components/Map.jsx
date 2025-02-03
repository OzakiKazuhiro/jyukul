import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ location }) => {
    const position = [location.lat, location.lng]; // 緯度と経度

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    {location.name} <br /> {location.address}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
