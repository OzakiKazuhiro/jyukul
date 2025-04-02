import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// マーカーアイコンの問題を修正（バックアップ対策）
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

const Map = ({ location }) => {
    const position = [location.lat, location.lng]; // 緯度と経度

    // マーカーアイコンの設定（コンポーネント内でも定義）
    const customIcon = new L.Icon({
        iconUrl: markerIcon,
        shadowUrl: markerIconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

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
            <Marker position={position} icon={customIcon}>
                <Popup>
                    {location.name} <br /> {location.address}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
