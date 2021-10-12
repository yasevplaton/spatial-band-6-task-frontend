import { CircleMarker, Popup } from "react-leaflet";
import { LatLng } from "leaflet/dist/leaflet-src.esm";
import { DEFAULT_MARKER_STYLE } from "../../config/styles";

export const MarkerCollection = ({ data }) => {
  return data.map((feature) => {
    const position = new LatLng(feature.Y, feature.X);
    const markerStyle = {
      ...DEFAULT_MARKER_STYLE,
    };
    return (
      <CircleMarker
        key={feature.point_id}
        center={position}
        radius={3}
        pathOptions={markerStyle}
      >
        <Popup>А может тут школку бабахнем?</Popup>
      </CircleMarker>
    );
  });
};
