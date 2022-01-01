// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h } from "preact";
import { useEffect, useRef } from "preact/compat";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import pointsOfInterest from "./data/points-of-interest-mourne.json";

const API_KEY = import.meta.env.VITE_MAPBOX_KEY as string;

mapboxgl.accessToken = API_KEY;

export let map: mapboxgl.Map;

const Mapbox = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    map = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: pointsOfInterest.features[0].geometry
        .coordinates as mapboxgl.LngLatLike,
      pitch: 60,
      zoom: 15,
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: pointsOfInterest,
      });
      // add markers for each point in the points-of-interest source
      map.addLayer({
        id: "points-of-interest",
        type: "circle",
        source: "points-of-interest",
        paint: {
          "circle-radius": ["coalesce", ["get", "circle-radius"], 15],
          "circle-color": ["coalesce", ["get", "circle-color"], "red"],
          "circle-stroke-width": [
            "coalesce",
            ["get", "circle-stroke-width"],
            5,
          ],
          "circle-stroke-color": [
            "coalesce",
            ["get", "circle-stroke-color"],
            "#fff",
          ],
        },
      });
    });
  }, []);

  return <div class="h-full w-full fixed inset-0 map-image" ref={ref} />;
};

export default Mapbox;
