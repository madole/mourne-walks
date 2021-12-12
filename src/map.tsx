import { useEffect, useRef } from "preact/compat";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { h } from "preact";
import pointsOfInterest from "./data/points-of-interest.json";

const API_KEY = import.meta.env.VITE_MAPBOX_KEY as string;

console.log({ API_KEY });

mapboxgl.accessToken = API_KEY;

export let map: mapboxgl.Map;

const Mapbox = () => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!ref.current) return;
    map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-5.894368886947632, 54.20567286749702],
      pitch: 60,
      zoom: 17,
    });
    map.on("load", () => {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.addLayer({
        id: "hillshading",
        source: "mapbox-dem",
        type: "hillshade",
      });
      map.addSource("points-of-interest", {
        type: "geojson",
        // @ts-ignore
        data: pointsOfInterest,
      });
      // add markers for each point in the points-of-interest source
      map.addLayer({
        id: "points-of-interest",
        type: "circle",
        source: "points-of-interest",
        paint: {
          "circle-radius": 15,
          "circle-color": "red",
          "circle-stroke-width": 5,
          "circle-stroke-color": "#fff",
        },
      });
    });
  }, []);

  return (
    <div
      class="h-full w-full fixed top-0 bottom-0 left-80 right-0 map-image"
      ref={ref}
    />
  );
};

export default Mapbox;
