import { LngLatLike } from "mapbox-gl";
import { map } from "../map";
import pointsOfInterest from "../data/points-of-interest.json";

function getBearing(index: number) {
  if (index === 0) {
    return 0;
  }
  if (index === pointsOfInterest.features.length - 1) {
    return 70;
  }
  return 180;
}

function getZoom(index: number) {
  if (index === pointsOfInterest.features.length - 1) {
    return 16;
  }
  return 17;
}
export function flyToLocation(
  link: string,
  coordinates: LngLatLike,
  index: number
) {
  window.history.replaceState({}, "", `#${link}`);
  map.flyTo({
    center: coordinates,
    zoom: getZoom(index),
    essential: true,
    bearing: getBearing(index),
    speed: 1,
  });
}
