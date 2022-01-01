import { GeoJSON } from "geojson";

export interface Feature extends GeoJSON.Feature<GeoJSON.Point> {
  properties: {
    link: string;
    zoom?: number;
    bearing?: number;
    heading: string;
    body: string;
  };
}
