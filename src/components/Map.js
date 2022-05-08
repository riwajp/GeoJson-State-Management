import { useContext, useState, useEffect, useRef } from "react";
import { DataContext } from "./DataDisplay";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import data from "../data.json";
import { _filter_state } from "./states";
import { useRecoilState } from "recoil";

const Map = ({ mapbox_token }) => {
  const { selected_data, map_data } = useContext(DataContext);

  const mapContainer = useRef(null);
  var map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(3);
  const [loaded, setLoaded] = useState(false);

  mapboxgl.accessToken = mapbox_token;

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      setLoaded(true);
      map.current.addSource("states", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
      map.current.addLayer({
        id: "stateslayer",
        type: "fill",
        source: "states",
        layout: { visibility: "visible" },
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],

            "pink",
            [
              "case",
              ["boolean", ["feature-state", "selected"], false],
              "red",
              "orange",
            ],
          ],

          "fill-opacity": 0.5,
        },
      });

      map.current.addLayer({
        id: "stateslayer1",
        type: "line",
        source: "states",
        layout: { visibility: "visible" },
        paint: { "line-color": "white", "line-width": 3 },
      });
    });

    let feature_id = 0;
    map.current.on("mousemove", "stateslayer", (e) => {
      map.current.setFeatureState(
        { source: "states", id: feature_id },
        { hover: false }
      );
      feature_id = e.features[0].id;

      map.current.setFeatureState(
        { source: "states", id: feature_id },
        { hover: true }
      );
    });

    map.current.on("mouseout", "stateslayer", (e) => {
      map.current.setFeatureState(
        { source: "states", id: feature_id },
        { hover: false }
      );
    });
  }, [selected_data]);

  if (loaded) {
    if (selected_data.id) {
      map.current.removeFeatureState({ source: "states" });
      map.current.setFeatureState(
        { source: "states", id: selected_data.id },
        { selected: true }
      );
    }

    map.current
      .getSource("states")
      .setData({ type: "FeatureCollection", features: map_data });
  }

  return (
    <div className="map">
      <h3>Map</h3>

      <br />
      <br />
      <div className="map-container" ref={mapContainer}></div>
    </div>
  );
};

export default Map;
