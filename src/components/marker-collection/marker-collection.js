import { CircleMarker, Popup } from "react-leaflet";
import { LatLng } from "leaflet/dist/leaflet-src.esm";
import { DEFAULT_MARKER_STYLE } from "../../config/styles";

export const MarkerCollection = ({ data, radiusScale, colorScale }) => {
  return data.map((feature) => {
    const position = new LatLng(feature.latitude, feature.longitude);
    const markerStyle = {
      ...DEFAULT_MARKER_STYLE,
      fillColor: colorScale(feature["nagruzka"]),
    };

    return (
      <CircleMarker
        key={feature.school_id}
        center={position}
        pathOptions={markerStyle}
        radius={radiusScale(feature["pupils_cnt"])}
      >
        <Popup>
          <div>{feature["pupils_cnt"]}</div>
          <div>{feature["nagruzka"]}</div>
        </Popup>
      </CircleMarker>
    );
  });
};
