import { h } from "preact";
import { blurbs } from "./data";
import type { BlurbType } from "./data";
import { useEffect, useRef } from "preact/compat";
import useIntersectionObserver from "./hooks/useIntersectionObserver";
import pointsOfInterest from "./data/points-of-interest.json";
import { map } from "./map";
import { flyToLocation } from "./utils/flyToLocation";
import { LngLatLike } from "mapbox-gl";

const Blurb = ({ blurb, index }: { blurb: BlurbType; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 1,
    rootMargin: "0px 0px -200px 0px",
  });
  useEffect(() => {
    if (entry?.isIntersecting) {
      if (window.location.href.includes(blurb.link)) {
        return;
      }
      const feature = pointsOfInterest.features[index];
      flyToLocation(
        blurb.link,
        feature.geometry.coordinates as LngLatLike,
        index
      );
    }
  }, [entry]);

  // useEffect(() => {
  //   function rotateCamera(timestamp: number) {
  //     // clamp the rotation between 0 -360 degrees
  //     // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  //     map.rotateTo((timestamp / 100) % 360, { duration: 0 });
  //     // Request the next frame of the animation.
  //     requestAnimationFrame(rotateCamera);
  //   }
  //   debugger;
  //   window.onscroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >=
  //       document.body.offsetHeight - 20
  //     ) {
  //       rotateCamera(0);
  //     }
  //   };
  // }, []);

  return (
    <div
      ref={ref}
      id={blurb.link}
      className="flex flex-col gap-4 bg-white p-10 rounded-3xl shadow-lg w-2/3"
    >
      <h2 className="text-2xl font-bold">{blurb.heading}</h2>
      <p className="text-lg">{blurb.body}</p>
    </div>
  );
};

function Content() {
  return (
    <div class="flex flex-col gap-108 mb-108 items-center">
      {blurbs.map((blurb, index) => (
        <Blurb blurb={blurb} index={index} key={blurb.link} />
      ))}
    </div>
  );
}

export default Content;
