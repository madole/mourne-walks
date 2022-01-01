import { map } from "../map";
import { Feature } from "../types";
import pointsOfInterest from "../data/points-of-interest-mourne.json";
import { LngLatLike } from "mapbox-gl";

window.onload = () => {
  const link = window.location.href.split("#")[1];
  if (link) {
    const content = document.getElementById(link);
    content?.scrollIntoView({ behavior: "smooth" });
    const flyToFeature = pointsOfInterest.features.find(
      (feature) => feature.properties.link === link
    ) as Feature;
    if (flyToFeature) {
      flyToLocation(flyToFeature);
    }
  }
};

export function flyToLocation(feature: Feature) {
  const {
    properties: { link, zoom, bearing },
    geometry: { coordinates },
  } = feature;
  window.history.replaceState({}, "", `#${link}`);
  window.dispatchEvent(new CustomEvent("historyStateReplaced"));
  map?.flyTo({
    offset: [10, 150],
    center: coordinates as LngLatLike,
    zoom: zoom ?? 17,
    essential: true,
    bearing: bearing ?? 180,
    speed: 0.5,
  });
}
